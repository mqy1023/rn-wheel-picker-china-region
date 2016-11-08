import React from 'react';

/* eslint no-return-assign: "off"*/
export default class BaseComponent extends React.Component {
  _bind(...methods) {
    methods.forEach((method) => this[method] = this[method].bind(this));
  }
}
