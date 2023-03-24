var proFieldProps = "valueType request plain renderFormItem render text formItemProps valueEnum";
var proFormProps = "fieldProps isDefaultDom groupProps contentRender submitterProps submitter";
export function pickProProps(props) {
  var propList = "".concat(proFieldProps, " ").concat(proFormProps).split(/[\s\n]+/);
  var attrs = {};
  Object.keys(props || {}).forEach(function (key) {
    if (propList.includes(key)) {
      return;
    }
    attrs[key] = props[key];
  });
  return attrs;
}