(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{21:function(e,n,t){e.exports=t.p+"static/media/cloud-download.ebd06da3.svg"},22:function(e,n,t){e.exports=t.p+"static/media/loading.584b607f.gif"},23:function(e,n,t){e.exports=t.p+"static/media/loading2.25ef2804.gif"},24:function(e,n,t){e.exports=t.p+"static/media/check.1899110c.svg"},25:function(e,n,t){e.exports=t.p+"static/media/alert.50a03322.svg"},26:function(e,n,t){e.exports=t(55)},32:function(e,n,t){},55:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(20),s=t.n(o),c=(t(32),t(3)),l=t.n(c),i=t(10),u=t(9),d=t(4),m=t(5),p=t(7),g=t(6),h=t(8),f=t(12),k=t(13),v=t(1),y=t.n(v),D=y.a.CancelToken,C="http://intentionally_removed/customGMV_v2.php",P="http://intentionally_removed/customActiveListings.php",b="http://intentionally_removed/customReturnsOverview.php",T="http://intentionally_removed/customConversion.php",w="http://intentionally_removed/customSoldItems.php",x="http://intentionally_removed/customPhoto.php",R="http://intentionally_removed/customSellerDashboard.php",E="http://intentionally_removed/customGroHandler.php",A={getGmv:function(e){if(e.cancelApiRequest)return null;var n=D.source(),t=new URLSearchParams;return t.append("oracle",e.oracle),t.append("userID",e.userID),{cancelToken:n,axios:y.a.post(C,t,{headers:{"Content-Type":"application/x-www-form-urlencoded"},cancelToken:n.token})}},getActiveListings:function(e){if(e.cancelApiRequest)return null;var n=D.source(),t=new URLSearchParams;return t.append("oracle",e.oracle),t.append("userID",e.userID),{cancelToken:n,axios:y.a.post(P,t,{headers:{"Content-Type":"application/x-www-form-urlencoded"},cancelToken:n.token})}},getConversion:function(e){if(e.cancelApiRequest)return null;var n=D.source(),t=new URLSearchParams;return t.append("oracle",e.oracle),t.append("userID",e.userID),{cancelToken:n,axios:y.a.post(T,t,{headers:{"Content-Type":"application/x-www-form-urlencoded"},cancelToken:n.token})}},getDashboard:function(e){if(e.cancelApiRequest)return null;var n=D.source(),t=new URLSearchParams;return t.append("oracle",e.oracle),{cancelToken:n,axios:y.a.post(R,t,{headers:{"Content-Type":"application/x-www-form-urlencoded"},cancelToken:n.token})}},getPhotoCount:function(e){if(e.cancelApiRequest)return null;var n=D.source(),t=new URLSearchParams;return t.append("oracle",e.oracle),t.append("userID",e.userID),{cancelToken:n,axios:y.a.post(x,t,{headers:{"Content-Type":"application/x-www-form-urlencoded"},cancelToken:n.token})}},getReturns:function(e){if(e.cancelApiRequest)return null;var n=D.source(),t=new URLSearchParams;return t.append("oracle",e.oracle),t.append("from",e.from),t.append("to",e.to),t.append("userID",e.userID),{cancelToken:n,axios:y.a.post(b,t,{headers:{"Content-Type":"application/x-www-form-urlencoded"},cancelToken:n.token})}},getSoldItem:function(e){if(e.cancelApiRequest)return null;var n=D.source(),t=new URLSearchParams;return t.append("oracle",e.oracle),t.append("from",e.from),t.append("to",e.to),t.append("userID",e.userID),{cancelToken:n,axios:y.a.post(w,t,{headers:{"Content-Type":"application/x-www-form-urlencoded"},cancelToken:n.token})}},getGroDataMobile:function(e){if(e.cancelApiRequest)return null;var n=D.source();return{cancelToken:n,axios:y()({url:"http://intentionally_removed/".concat(e.oracle,"/list_srch_vi_purchase_gmb.json?start=").concat(e.firstDayFirstMonthLastYear,"&end=").concat(e.yesterday,"&exp=mobile&vrtcl=%2Cb%26i%2Ccollectibles%2Celectronics%2Cfashion%2Chome%26garden%2Clifestyle%2Cmedia%2Cp%26a%2Cunknown"),method:"get",cancelToken:n.token})}},getGroDataSite:function(e){if(e.cancelApiRequest)return null;var n=D.source();return{cancelToken:n,axios:y()({url:"http://intentionally_removed/".concat(e.oracle,"/list_srch_vi_purchase_gmb.json?start=").concat(e.firstDayFirstMonthLastYear,"&end=").concat(e.yesterday,"&exp=site&vrtcl=%2Cb%26i%2Ccollectibles%2Celectronics%2Cfashion%2Chome%26garden%2Clifestyle%2Cmedia%2Cp%26a%2Cunknown"),method:"get",cancelToken:n.token})}},storeGroData:function(e){if(e.cancelApiRequest)return null;var n=D.source(),t=new URLSearchParams;return t.append("oracle",e.oracle),t.append("groType",e.groType),t.append("dataPayload",e.dataPayload),t.append("userID",e.userID),{cancelToken:n,axios:y.a.post(E,t,{headers:{"Content-Type":"application/x-www-form-urlencoded"},cancelToken:n.token})}},fakeApiCall:function(){return{cancelToken:D.source(),axios:new Promise(function(e){setTimeout(function(){e("Fake API data received")},2700)})}}},I={formatDecimals:function(e){return e/100},cleanGroApiData:function(e){var n=new RegExp("[,\\n]","g"),t={};for(var a in e){if(t[a]=e[a].split(n).filter(function(e){return e}),"gmv"===a)for(var r=0;r<t[a].length;r++)t[a][r]>99&&(t[a][r]=this.formatDecimals(t[a][r]));t[a].splice(0,2);for(var o=[],s=t[a].length,c=0;c<s;c+=2)o.push(t[a].splice(0,2));t[a]=o}var l=[];return l.push(t),l},formatGroResponseToCsv:function(e){for(var n="Day,Listings,Impressions,ViewItems,SoldItems,GMV\n",t=0;t<e.gmv.length;t++)n=(n=(n=(n=(n=(n=(n=n.concat("".concat(e.gmv[t][0],","))).concat("".concat(e.list[t][1],","))).concat("".concat(e.imp[t][1],","))).concat("".concat(e.vi[t][1],","))).concat("".concat(e.purchase[t][1],","))).concat("".concat(e.gmv[t][1]))).concat("\n");return n}},O={yyyymmdd:function(e,n){var t=new Date,a=t.getMonth()+1,r=t.getDate()-n;return[t.getFullYear()-e,(a>9?"":"0")+a,(r>9?"":"0")+r].join("/")},yyyymmddCustom:function(e,n,t){return[t,(e>9?"":"0")+e,(n>9?"":"0")+n].join("/")},firstDay:function(e){var n=(new Date).getFullYear(),t=new Date(n,e,1);return this.yyyymmddCustom(t.getMonth()+1,t.getDate(),t.getFullYear())},lastDay:function(e){var n=(new Date).getFullYear(),t=new Date(n,e+1,0);return this.yyyymmddCustom(t.getMonth()+1,t.getDate(),t.getFullYear())},todaysDate:function(){return this.yyyymmdd(0,0)},yesterdaysDate:function(){return this.yyyymmdd(0,1)},previousMonthLastDay:function(){var e=(new Date).getMonth();return e--,this.lastDay(e)},previousYearToday:function(){return this.yyyymmdd(1,0)},firstDayFirstMonthLastYear:function(){return this.yyyymmddCustom(1,1,this.previousYear())},previousYear:function(){return(new Date).getFullYear()-1},get12MonthEvalDates:function(e,n){var t,a;return n--,e>5&&e<20?(t=n-12,a=n-1):(t=n-13,a=n-2),{evalFirstDay:this.firstDay(t),evalLastDay:this.lastDay(a)}},get3MonthEvalDates:function(e,n){var t,a;return n--,e>5&&e<20?(t=n-3,a=n-1):(t=n-4,a=n-2),{evalFirstDay:this.firstDay(t),evalLastDay:this.lastDay(a)}},getEvalDates:function(e){var n=new Date,t=n.getMonth()+1,a=n.getDate(),r=e>=400?this.get3MonthEvalDates(a,t):this.get12MonthEvalDates(a,t);return{threeMonthCount:e,from:r.evalFirstDay,to:r.evalLastDay}}},L=t(21),S=t.n(L),G=function(e){function n(e){var t;return Object(d.a)(this,n),(t=Object(p.a)(this,Object(g.a)(n).call(this,e))).downloadReports=function(){var e=document.createElement("a");e.style.display="none",document.getElementById("downloadReports").appendChild(e);for(var n=0;n<t.props.links.length;n++)null===t.props.links[n].link||(e.setAttribute("href",t.props.links[n].link),e.setAttribute("download",t.props.links[n].fileName),e.click());document.getElementById("downloadReports").removeChild(e)},t.state={},t}return Object(h.a)(n,e),Object(m.a)(n,[{key:"render",value:function(){return r.a.createElement("span",{id:"downloadReports"},r.a.createElement("button",{className:"btn btn-warning btn-sm",disabled:this.props.hidden,onClick:this.downloadReports},r.a.createElement("img",{src:S.a,alt:"download"})," Download Reports"))}}]),n}(a.Component),N=t(22),j=t.n(N),U=t(23),M=t.n(U),q=t(24),_=t.n(q),F=t(25),Y=t.n(F),B=function(e){function n(e){var t;return Object(d.a)(this,n),(t=Object(p.a)(this,Object(g.a)(n).call(this,e))).progressRender=function(e){switch(e){case 0:return r.a.createElement("div",null,"Paused");case 1:return r.a.createElement("div",null,"Loading.. ",r.a.createElement("img",{src:j.a,alt:"loading"}));case 2:return r.a.createElement("div",null,r.a.createElement("img",{src:_.a,alt:"check"})," Loaded!");default:return r.a.createElement("div",null,r.a.createElement("img",{src:Y.a,alt:"error"})," Error")}},t.state={},t}return Object(h.a)(n,e),Object(m.a)(n,[{key:"render",value:function(){var e=this,n="".concat(this.props.userID,"_").concat(this.props.index);return r.a.createElement("div",{className:"col-md-4"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},this.props.userID?this.props.userID:this.props.title),this.props.hideDownloadButton?r.a.createElement("h6",{className:"card-subtitle mb-2 text-muted"},"Loading.. ",r.a.createElement("img",{src:M.a,alt:"loading"})):r.a.createElement("h6",{className:"card-subtitle mb-2 text-muted"},"Done!"),r.a.createElement("p",{className:"card-text"},r.a.createElement(G,{links:this.props.dataSources,hidden:this.props.hideDownloadButton,oracle:this.props.oracle}),r.a.createElement("button",{className:"btn btn-primary btn-sm",type:"button","data-toggle":"collapse","data-target":"#".concat(n),"aria-expanded":"false","aria-controls":"collapseExample"},"Details")),r.a.createElement("div",{className:"collapse",id:n},this.props.dataSources.map(function(n,t){return r.a.createElement("div",{className:"row",key:t},r.a.createElement("div",{className:"col-md-6"},n.name),r.a.createElement("div",{className:"col-md-6"},e.progressRender(n.progress)))})))))}}]),n}(a.Component),H=function(e){function n(e){var t;return Object(d.a)(this,n),(t=Object(p.a)(this,Object(g.a)(n).call(this,e))).realAPICall=Object(k.a)(l.a.mark(function e(){var n,a,r,o,s,c,i,u,d,m,p,g;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=!1,a=1===(new Date).getDate()?O.previousMonthLastDay():O.yesterdaysDate(),r={oracle:t.props.oracle,firstDayFirstMonthLastYear:O.firstDayFirstMonthLastYear(),yesterday:a,cancelApiRequest:n},t.incrementProgress(0),o=A.getDashboard(r),t.addCancelToken(o.cancelToken),e.next=8,o.axios.then(function(e){t.addLinkToLinksArray(e.data.conData,0),t.incrementProgress(0);var n=parseFloat(e.data.content1[1][2]),a=e.data.content1[1][1],o=O.getEvalDates(n),s=o.to,c=o.from;r.to=s,r.from=c,r.userID=a,t.setState({threeMonthCount:n,to:s,from:c,userID:a})}).catch(function(e){y.a.isCancel(e)?(n=!0,console.log("Request canceled",e.message)):(console.log("getDashboard"),console.log(e),t.incrementProgress(0),t.incrementProgress(0))});case 8:return s=A.getGroDataMobile(r),c=A.getGroDataSite(r),t.addCancelToken(s.cancelToken),t.addCancelToken(c.cancelToken),t.incrementProgress(1),t.incrementProgress(2),Promise.all([s.axios,c.axios]).then(function(e){var a=I.cleanGroApiData(e[0].data),o=I.cleanGroApiData(e[1].data),s=I.formatGroResponseToCsv(a[0]),c=I.formatGroResponseToCsv(o[0]),l={oracle:r.oracle,groType:"siteGRO",dataPayload:c,userID:r.userID,cancelApiRequest:n},i={oracle:r.oracle,groType:"mobileGRO",dataPayload:s,userID:r.userID,cancelApiRequest:n},u=A.storeGroData(l);t.addCancelToken(u.cancelToken),u.axios.then(function(e){t.addLinkToLinksArray(e.data.conData,2)}).catch(function(e){console.log(e),console.log("error saving GRO .csv file mobile")});var d=A.storeGroData(i);t.addCancelToken(d.cancelToken),d.axios.then(function(e){t.addLinkToLinksArray(e.data.conData,1)}).catch(function(e){console.log(e),console.log("error saving GRO .csv file mobile")}),t.incrementProgress(1),t.incrementProgress(2)}).catch(function(e){y.a.isCancel(e)?(n=!0,console.log("Request canceled",e.message)):(console.log("Promise.all"),console.log(e),t.incrementProgress(1),t.incrementProgress(1),t.incrementProgress(2),t.incrementProgress(2))}),t.incrementProgress(3),i=A.getGmv(r),t.addCancelToken(i.cancelToken),i.axios.then(function(e){t.addLinkToLinksArray(e.data.content1,3),t.incrementProgress(3)}).catch(function(e){y.a.isCancel(e)?(n=!0,console.log("Request canceled",e.message)):(console.log("getGmv"),console.log(e),t.incrementProgress(3),t.incrementProgress(3))}),t.incrementProgress(4),u=A.getActiveListings(r),t.addCancelToken(u.cancelToken),e.next=24,u.axios.then(function(e){t.addLinkToLinksArray(e.data.content1,4),t.incrementProgress(4)}).catch(function(e){y.a.isCancel(e)?(n=!0,console.log("Request canceled",e.message)):(console.log("getActiveListings"),console.log(e),t.incrementProgress(4),t.incrementProgress(4))});case 24:return t.incrementProgress(5),d=A.getConversion(r),t.addCancelToken(d.cancelToken),d.axios.then(function(e){t.addLinkToLinksArray(e.data.content1,5),t.incrementProgress(5)}).catch(function(e){y.a.isCancel(e)?(n=!0,console.log("Request canceled",e.message)):(console.log("getConversion"),console.log(e),t.incrementProgress(5),t.incrementProgress(5))}),t.incrementProgress(6),m=A.getPhotoCount(r),t.addCancelToken(m.cancelToken),e.next=33,m.axios.then(function(e){t.addLinkToLinksArray(e.data.content1,6),t.incrementProgress(6)}).catch(function(e){y.a.isCancel(e)?(n=!0,console.log("Request canceled",e.message)):(console.log("getPhotoCount"),console.log(e),t.incrementProgress(6),t.incrementProgress(6))});case 33:return t.incrementProgress(7),p=A.getReturns(r),t.addCancelToken(p.cancelToken),p.axios.then(function(e){t.addLinkToLinksArray(e.data.content1,7),t.incrementProgress(7)}).catch(function(e){y.a.isCancel(e)?(n=!0,console.log("Request canceled",e.message)):(console.log("getReturns"),console.log(e),t.incrementProgress(7),t.incrementProgress(7))}),t.incrementProgress(8),g=A.getSoldItem(r),t.addCancelToken(g.cancelToken),e.next=42,g.axios.then(function(e){t.addLinkToLinksArray(e.data.content1,8),t.incrementProgress(8)}).catch(function(e){y.a.isCancel(e)?(n=!0,console.log("Request canceled",e.message)):(console.log("getSoldItem"),console.log(e),t.incrementProgress(8),t.incrementProgress(8))});case 42:t.toggleHideDownloadButton(),t.props.trigger();case 44:case"end":return e.stop()}},e,this)})),t.fakeAPICall=Object(k.a)(l.a.mark(function e(){var n,a,r,o,s,c,i,u,d,m,p,g;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=!1,a=1===(new Date).getDate()?O.previousMonthLastDay():O.yesterdaysDate(),r={oracle:t.props.oracle,firstDayFirstMonthLastYear:O.firstDayFirstMonthLastYear(),yesterday:a,cancelApiRequest:n},t.incrementProgress(0),o=A.fakeApiCall(r),t.addCancelToken(o.cancelToken),e.next=8,o.axios.then(function(e){t.incrementProgress(0);var n=t.props.title,a=O.getEvalDates(450),o=a.to,s=a.from;r.to=o,r.from=s,r.userID=n,t.setState({threeMonthCount:450,to:o,from:s,userID:n})}).catch(function(e){y.a.isCancel(e)?(n=!0,console.log("Request canceled",e.message)):(console.log("getDashboard"),console.log(e),t.incrementProgress(0),t.incrementProgress(0))});case 8:return s=A.fakeApiCall(r),c=A.fakeApiCall(r),t.addCancelToken(s.cancelToken),t.addCancelToken(c.cancelToken),t.incrementProgress(1),t.incrementProgress(2),Promise.all([s.axios,c.axios]).then(function(e){t.incrementProgress(1),t.incrementProgress(2)}).catch(function(e){y.a.isCancel(e)?(n=!0,console.log("Request canceled",e.message)):(console.log("Promise.all"),console.log(e),t.incrementProgress(1),t.incrementProgress(1),t.incrementProgress(2),t.incrementProgress(2))}),t.incrementProgress(3),i=A.fakeApiCall(r),t.addCancelToken(i.cancelToken),i.axios.then(function(e){t.incrementProgress(3)}).catch(function(e){y.a.isCancel(e)?(n=!0,console.log("Request canceled",e.message)):(console.log("getGmv"),console.log(e),t.incrementProgress(3),t.incrementProgress(3))}),t.incrementProgress(4),u=A.fakeApiCall(r),t.addCancelToken(u.cancelToken),e.next=24,u.axios.then(function(e){t.incrementProgress(4)}).catch(function(e){y.a.isCancel(e)?(n=!0,console.log("Request canceled",e.message)):(console.log("getActiveListings"),console.log(e),t.incrementProgress(4),t.incrementProgress(4))});case 24:return t.incrementProgress(5),d=A.fakeApiCall(r),t.addCancelToken(d.cancelToken),d.axios.then(function(e){t.incrementProgress(5)}).catch(function(e){y.a.isCancel(e)?(n=!0,console.log("Request canceled",e.message)):(console.log("getConversion"),console.log(e),t.incrementProgress(5),t.incrementProgress(5))}),t.incrementProgress(6),m=A.fakeApiCall(r),t.addCancelToken(m.cancelToken),e.next=33,m.axios.then(function(e){t.incrementProgress(6)}).catch(function(e){y.a.isCancel(e)?(n=!0,console.log("Request canceled",e.message)):(console.log("getPhotoCount"),console.log(e),t.incrementProgress(6),t.incrementProgress(6))});case 33:return t.incrementProgress(7),p=A.fakeApiCall(r),t.addCancelToken(p.cancelToken),p.axios.then(function(e){t.incrementProgress(7)}).catch(function(e){y.a.isCancel(e)?(n=!0,console.log("Request canceled",e.message)):(console.log("getReturns"),console.log(e),t.incrementProgress(7),t.incrementProgress(7))}),t.incrementProgress(8),g=A.fakeApiCall(r),t.addCancelToken(g.cancelToken),e.next=42,g.axios.then(function(e){t.incrementProgress(8)}).catch(function(e){y.a.isCancel(e)?(n=!0,console.log("Request canceled",e.message)):(console.log("getSoldItem"),console.log(e),t.incrementProgress(8),t.incrementProgress(8))});case 42:t.toggleHideDownloadButton(),t.props.trigger();case 44:case"end":return e.stop()}},e,this)})),t.incrementProgress=function(e){t.setState(function(n){var t=Object(f.a)({},n);return t.dataSources[e].progress++,{newState:t}})},t.toggleHideDownloadButton=function(){t.setState(function(e){return{hideDownloadButton:!e.hideDownloadButton}})},t.addLinkToLinksArray=function(e,n){var a="http://intentionally_removed/".concat(e),r=Object(f.a)({},t.state.dataSources);r[n].link=a,r[n].fileName=e,t.setState({datasources:r})},t.addCancelToken=function(e){t.setState(function(n){var t=Object(i.a)(n.cancelTokens);return t.push(e),{cancelTokens:t}})},t.fireAllCancels=function(){t.state.cancelTokens.forEach(function(e){e.cancel("Operation canceled by the user.")})},t.state={dataSources:[{name:"Dashboard",progress:0,shouldRender:!1,data:"",link:null,fileName:String()},{name:"GroMobile",progress:0,shouldRender:!1,data:"",link:null,fileName:String()},{name:"GroSite",progress:0,shouldRender:!1,data:"",link:null,fileName:String()},{name:"GMV",progress:0,shouldRender:!1,data:"",link:null,fileName:String()},{name:"ActiveListings",progress:0,shouldRender:!1,data:"",link:null,fileName:String()},{name:"Conversion",progress:0,shouldRender:!1,data:"",link:null,fileName:String()},{name:"PhotoCount",progress:0,shouldRender:!1,data:"",link:null,fileName:String()},{name:"Returns",progress:0,shouldRender:!1,data:"",link:null,fileName:String()},{name:"SoldItem",progress:0,shouldRender:!1,data:"",link:null,fileName:String()}],hideDownloadButton:!0,userID:"",cancelTokens:[]},t}return Object(h.a)(n,e),Object(m.a)(n,[{key:"componentDidMount",value:function(){this.fakeAPICall()}},{key:"componentWillUnmount",value:function(){this.fireAllCancels()}},{key:"render",value:function(){return r.a.createElement(B,{userID:this.props.title,title:this.props.title,index:this.props.index,orace:this.props.oracle,dataSources:this.state.dataSources,hideDownloadButton:this.state.hideDownloadButton})}}]),n}(a.Component),V=function(e){function n(e){var t;return Object(d.a)(this,n),(t=Object(p.a)(this,Object(g.a)(n).call(this,e))).initiateGenerator=function(){t.setState({myGener:t.myGen()})},t.handleInputChange=function(e){var n,a=e.target,r=a.name,o=a.value,s=t.splitOracles(o);t.setState((n={},Object(u.a)(n,r,o),Object(u.a)(n,"unprocessedOracles",s),n))},t.splitOracles=function(e){return e.split(",")},t.startCycle=function(){if(!t.state.rawOracles)return null;t.toggleInputDisabled(),t.triggerGenerator()},t.myGen=l.a.mark(function e(){var n,t,a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=l.a.keys(this.state.unprocessedOracles);case 1:if((e.t1=e.t0()).done){e.next=11;break}return n=e.t1.value,t=Object(i.a)(this.state.unprocessedOracles),(a=Object(i.a)(this.state.processedOracles)).push(t[n]),this.setState({processedOracles:a}),e.next=9,n;case 9:e.next=1;break;case 11:case"end":return e.stop()}},e,this)}),t.triggerGenerator=function(){t.state.myGener.next()},t.toggleInputDisabled=function(){t.setState(function(e){return{disabledInput:!e.disabledInput}})},t.clearComponentData=function(){t.setState({rawOracles:"User1, User2, User3, User4, User5, User6",unprocessedOracles:["User1","User2","User3","User4","User5","User6"],processedOracles:[],myGener:"",disabledInput:!1},function(){return t.initiateGenerator()})},t.state={rawOracles:"User1, User2, User3, User4, User5, User6",unprocessedOracles:["User1","User2","User3","User4","User5","User6"],processedOracles:[],myGener:"",disabledInput:!1},t}return Object(h.a)(n,e),Object(m.a)(n,[{key:"componentWillMount",value:function(){this.initiateGenerator()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("nav",{className:"navbar navbar-dark bg-dark"},r.a.createElement("span",{className:"navbar-brand mb-0 h1"},"Business Readout Assistant")),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},"Start Here"),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-6"},r.a.createElement("textarea",{className:"form-control",rows:"3",name:"rawOracles",disabled:!0,value:this.state.rawOracles,onChange:this.handleInputChange}),r.a.createElement("br",null),r.a.createElement("p",{className:"card-text"},r.a.createElement("button",{className:"btn btn-primary",disabled:this.state.disabledInput,onClick:this.startCycle},"Go!"),r.a.createElement("button",{className:"btn btn-danger",onClick:this.clearComponentData},"Reset"))),r.a.createElement("div",{className:"col-md-6"},r.a.createElement("h5",{className:"card-title"},"Demo Mode"),r.a.createElement("p",null,"This demo will demonstrate synchronous handling of multiple asynchronos API calls."))))),r.a.createElement("div",{className:"row"},this.state.processedOracles.map(function(n,t){return r.a.createElement(H,{key:t,index:t,title:n,oracle:n,trigger:e.triggerGenerator})}))))}}]),n}(a.Component);s.a.render(r.a.createElement(V,null),document.getElementById("root"))}},[[26,2,1]]]);
//# sourceMappingURL=main.24d8db4a.chunk.js.map