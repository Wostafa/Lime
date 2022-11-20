import { NextRouter } from 'next/router';
import React, { useEffect } from 'react';
import { TOKEN_KEY, PostPublish } from '../../constants';
import { notify } from '../elements';

const EDITOR_DATA = 'editor-data';

export const publishHandler = async (
  editorInstance: React.MutableRefObject<any>,
  title: string,
  isPreview?: boolean,
  router?: NextRouter
) => {
  const data = await editorInstance.current.saver.save();
  if (!title || data.blocks.length === 0) {
    alert('title or content is empty');
    return;
  }
  const body: PostPublish = {
    title,
    data,
  };

  try {
    const sending = notify.show.loading(isPreview ? 'Preparing preview...' : 'Publishing post...', notify.default);
    const res = await fetch('/api/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: sessionStorage.getItem(TOKEN_KEY) || '',
        'x-is-preview': isPreview ? 'true' : '',
      },
      body: JSON.stringify(body),
    });
    notify.hide(sending);

    if (!res.ok) {
      throw new Error('Failed to publish the post');
    }
    const json = await res.json();
    console.log('Post published', json);

    if (isPreview) {
      showPreview(json.postId);
      return;
    }
    notify.show.success('Post successfully published', notify.default);
    const redirecting = notify.show.loading('Redirecting to post', notify.default);
    router?.push(`/post/${json.slug}`).then(()=>{
      notify.hide(redirecting);
    });

  } catch (e) {
    notify.show.error('Failed to publish post', notify.default);
    console.error('Network Error: ', e);
  }
};

export const showPreview = (postId: string) => {
  const secret = sessionStorage.getItem(TOKEN_KEY);
  const url = `/api/preview?secret=${secret}&postId=${postId}`;
  // does not work when called directly
  (() => {
    window.open(url, '_blank');
  })();
};

export const draftHandler = async (editorInstance: React.MutableRefObject<any>, title: string) => {
  const data = await editorInstance.current.saver.save();
  saveToStorage({
    title,
    data,
  });
  notify.show.success('Saved!', notify.default);
};

const saveToStorage = (data: {}) => {
  window.localStorage.setItem(EDITOR_DATA, JSON.stringify(data));
};
export const getFromStorage = () => {
  return JSON.parse(String(window.localStorage.getItem(EDITOR_DATA)));
};
