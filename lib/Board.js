'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _colr = require('colr');

var _colr2 = _interopRequireDefault(_colr);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _rcUtil = require('rc-util');

var _rcUtil2 = _interopRequireDefault(_rcUtil);

var colr = new _colr2['default']();

var WIDTH = 239;
var HEIGHT = 150;

var Board = (function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board(props) {
    var _this = this;

    _classCallCheck(this, Board);

    _get(Object.getPrototypeOf(Board.prototype), 'constructor', this).call(this, props);
    var events = ['onBoardMouseDown', 'onBoardDrag', 'onBoardDragEnd'];
    events.forEach(function (m) {
      _this[m] = _this[m].bind(_this);
    });
  }

  _createClass(Board, [{
    key: 'onBoardMouseDown',
    value: function onBoardMouseDown(e) {
      var x = e.clientX;
      var y = e.clientY;
      this.pointMoveTo({
        x: x,
        y: y
      });
      this.dragListener = _rcUtil2['default'].Dom.addEventListener(window, 'mousemove', this.onBoardDrag);
      this.dragUpListener = _rcUtil2['default'].Dom.addEventListener(window, 'mouseup', this.onBoardDragEnd);
    }
  }, {
    key: 'onBoardDrag',
    value: function onBoardDrag(e) {
      var x = e.clientX;
      var y = e.clientY;
      this.pointMoveTo({
        x: x,
        y: y
      });
    }
  }, {
    key: 'onBoardDragEnd',
    value: function onBoardDragEnd(e) {
      var x = e.clientX;
      var y = e.clientY;
      this.pointMoveTo({
        x: x,
        y: y
      });
      if (this.dragListener) {
        this.dragListener.remove();
        this.dragListener = null;
      }
      if (this.dragUpListener) {
        this.dragUpListener.remove();
        this.dragUpListener = null;
      }
    }
  }, {
    key: 'getPrefixCls',
    value: function getPrefixCls() {
      return this.props.rootPrefixCls + '-board';
    }

    /**
     * 移动光标位置到
     * @param  {object} pos X Y 全局坐标点
     * @return {undefined}
     */
  }, {
    key: 'pointMoveTo',
    value: function pointMoveTo(pos) {
      var rect = _reactDom2['default'].findDOMNode(this).getBoundingClientRect();
      var left = pos.x - rect.left;
      var top = pos.y - rect.top;

      left = Math.max(0, left);
      left = Math.min(left, WIDTH);
      top = Math.max(0, top);
      top = Math.min(top, HEIGHT);

      var hsv = {
        h: this.props.hsv.h,
        s: parseInt(left / WIDTH * 100, 10),
        v: parseInt((1 - top / HEIGHT) * 100, 10)
      };
      this.props.onChange(hsv);
    }
  }, {
    key: 'render',
    value: function render() {
      var prefixCls = this.getPrefixCls();
      var hsv = this.props.hsv;
      var hueHsv = [hsv.h, 100, 100];
      var hueColor = colr.fromHsvArray(hueHsv).toHex();
      var x = hsv.s / 100 * WIDTH - 4;
      var y = (1 - hsv.v / 100) * HEIGHT - 4;
      return _react2['default'].createElement(
        'div',
        { className: prefixCls },
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-' + 'hsv', style: { backgroundColor: hueColor } },
          _react2['default'].createElement('div', { className: prefixCls + '-' + 'value' }),
          _react2['default'].createElement('div', { className: prefixCls + '-' + 'saturation' })
        ),
        _react2['default'].createElement('span', { style: { left: x, top: y } }),
        _react2['default'].createElement('div', {
          className: prefixCls + '-' + 'handler',
          onMouseDown: this.onBoardMouseDown
        })
      );
    }
  }]);

  return Board;
})(_react2['default'].Component);

exports['default'] = Board;

Board.propTypes = {
  hsv: _react2['default'].PropTypes.object,
  onChange: _react2['default'].PropTypes.func,
  rootPrefixCls: _react2['default'].PropTypes.string
};
module.exports = exports['default'];