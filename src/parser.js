'use strict';

import 'babel/polyfill';
import _ from 'lodash';
import s from 'underscore.string';

import applyTests from './helpers/apartment-regex-tests.js';
import asyncFetch from './helpers/asyncFetch.js';

class Apartment {

  constructor (rawData, postId) {
    console.group('Apartment');

    this.post_id  = postId;
    this.rawData  = rawData;
    this.rejectReasons = [];
    console.info(`Got an apartment from post: ${this.post_id}...`, this);

    let a = _(rawData)
    .split(/\n/)
    .filter(string => {
      return string.length > 0;
    })
    .each(string => {
      applyTests(string, this);
    })
    .value();

    console.groupEnd('Apartment');
  }
}

class Post {

  constructor (post) {
    console.group('Post');

    this.id = post.id;
    this.rawData = post.text;
    this.isAd = false;

    if (/(объявление\ с\ комиссией|\: \реклама\ \:)/.test(this.rawData.toLowerCase())) {
      this.isAd = true;
    }

    console.info('Got new post: ${id}...', this);

    if (this.isAd) {
      this.apartments = [];
    }
    else {

      this.apartments = (
        _(post.text)
          .split(/Сда[е|ё]тся\:\ /)
          .filter(string => {
            return !(/^(-)+/.test(string));
          })
          .thru(function (rawArray) {
            console.info(`It has ${rawArray.length} apartments.`);
            return rawArray;
          })
          .map(string => {
            return new Apartment(string, this.id);
          })
          .value()
      );
    }

    console.groupEnd('Post');
  };
}

class PostStorage {

  constructor (getBy=10, offset=1) {
    this.postsMap = new Map();
    this.length = null;
    this.offset = offset;
    this.getBy = getBy;

    Object.defineProperty(this, 'posts', {
      get: () => {
        var posts = [];
        this.postsMap.forEach(item => {
          posts.push(item);
        });
        return posts;
      }
    });
  };

  getNextUrl = function () {
    return `https://api.vk.com/method/wall.get?domain=apartments_ekb&offset=${this.offset}&count=${this.getBy}&filter=owner&v=5.34`;
  };

  async fetchNext () {
    var data = await asyncFetch(this.getNextUrl());

    this.length = data.count;
    this.offset = this.offset + data.items.length;

    data.items.forEach(item => {
      let post = new Post(item);
      this.postsMap.set(post.id, post);
    });
  }
}

class ApartmentsStore {
  constructor() {

  }
}

let PF = window.PF = new PostStorage();
PF.fetchNext();
