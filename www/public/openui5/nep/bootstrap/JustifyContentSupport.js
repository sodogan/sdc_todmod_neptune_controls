sap.ui.define(["./library"],function(t){"use strict";const e={addMetadata:function(t){t.properties.justifyContent={type:"nep.bootstrap.JustifyContent"},t.properties.justifyContentSmall={type:"nep.bootstrap.JustifyContent"},t.properties.justifyContentMedium={type:"nep.bootstrap.JustifyContent"},t.properties.justifyContentLarge={type:"nep.bootstrap.JustifyContent"},t.properties.justifyContentXLarge={type:"nep.bootstrap.JustifyContent"},t.properties.justifyContentXXLarge={type:"nep.bootstrap.JustifyContent"}}},n={Start:"start",Center:"center",End:"end",Around:"around",Between:"between",Evenly:"evenly"};return e.createStyleClass=function(t,e){const o=e.getJustifyContent(),s=e.getJustifyContentSmall(),i=e.getJustifyContentMedium(),r=e.getJustifyContentLarge(),u=e.getJustifyContentXLarge(),y=e.getJustifyContentXXLarge();let p="";return o&&(p+=" justify-content-"+n[o]),s&&(p+=" justify-content-sm-"+n[s]),i&&(p+=" justify-content-md-"+n[i]),r&&(p+=" justify-content-lg-"+n[r]),u&&(p+=" justify-content-xl-"+n[u]),y&&(p+=" justify-content-xxl-"+n[y]),p},e});