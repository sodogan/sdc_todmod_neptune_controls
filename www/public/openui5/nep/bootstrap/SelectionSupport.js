sap.ui.define(["./library"],function(e){"use strict";const t={},s={};return t.addMetadata=function(e,t){e.properties.selectedKey={type:"string"},t&&(e.properties.selectedKeys={type:"string[]"}),e.events||(e.events={}),e.events.selectionChange={}},s.changeItemSelected=function(e,t,s){this.onSelectionChange&&this.onSelectionChange(e,t,s),this.changeSelectedKeys(e.getKey(),t)},s.changeSelectedKeys=function(e,t){const s=this._supportsMultipleSelection&&this._supportsMultipleSelection(),c=this.getSelectedKey();if(e)if(t)if(s){let t=this.getSelectedKeys();t||(t=[]),-1===t.indexOf(e)&&(t.push(e),this._setSelectedKeys(t))}else e!==c&&this._setSelectedKey(e);else if(s){let t=this.getSelectedKeys();if(t){const s=t.indexOf(e);-1!==s&&(t.splice(s,1),this._setSelectedKeys(t))}}else e===c&&this._setSelectedKey(null)},s.setSelectedKey=function(e){const t=this.getItems();for(const s of t)s._setSelected(e&&s.getKey()===e,!0);return this._setSelectedKey(e),this},s.setSelectedKeys=function(e){const t=this.getItems();for(const s of t)s._setSelected(!(!e||!e.length||-1===e.indexOf(s.getKey())),!0);return this._setSelectedKeys(e),this},s._setSelectedKey=function(e){this.setSelectedKeys&&this.setProperty("selectedKeys",e?[e]:null,!0),this.setProperty("selectedKey",e,!0)},s._setSelectedKeys=function(e){this.setProperty("selectedKey",e&&e.length?e[e.length-1]:null,!0),this.setProperty("selectedKeys",e,!0)},t.addMethods=function(e,t){const c=e.prototype;c.changeItemSelected=s.changeItemSelected,c.changeSelectedKeys=s.changeSelectedKeys,c.setSelectedKey=s.setSelectedKey,c._setSelectedKey=s._setSelectedKey,t&&(c.setSelectedKeys=s.setSelectedKeys,c._setSelectedKeys=s._setSelectedKeys)},t});