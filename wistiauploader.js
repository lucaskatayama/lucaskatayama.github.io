/**
 @toc

 @param {Object} scope (attrs that must be defined on the scope (i.e. in the controller) - they can't just be defined in the partial html). REMEMBER: use snake-case when setting these on the partial!
 TODO

 @param {Object} attrs REMEMBER: use snake-case when setting these on the partial! i.e. my-attr='1' NOT myAttr='1'
 TODO

 @dependencies
 TODO

 @usage
 partial / html:
 TODO

 controller / js:
 TODO

 //end: usage
 */

'use strict';

angular.module('lucaskatayama.angular-wistiauploader', []).directive('lkWistiauploader', [
    '$log','$compile','$parse',
    function ($log, $compile, $parse) {

    return {
        restrict: 'E',
        scope: {

        },
        replace : true,
        transclusion : false,

        compile : function(element, attrs){

            var html = "<div class='wistia-uploader'><span class='btn btn-success fileinput-button'>Choose File<input type='file' name='file' />" +"</span><div id='progress' class='progress'><div class='bar progress-bar progress-bar-success'></div></div></div>";

            var newElem = $(html);
            element.replaceWith(newElem);

            return function (scope, element, attrs, controller) {
                var el = $(element);
                el.fileupload({
                    url : 'https://upload.wistia.com?api_password='+attrs.token,
                    progressall: function (e, data) {
                        var progress = parseInt(data.loaded / data.total * 100, 10);
                        el.find('#progress .bar').css('width',progress + '%');
                    },
                    done: function (e, data) {
                        var result = data.result;
                        var id = result.hashed_id;
                        var html = '<script src="//fast.wistia.com/embed/medias/'+id+'.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:42.5% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_'+id+' videoFoam=true autoPlay=true" style="height:100%;width:100%">&nbsp;</div></div></div>';
                        var video = $(html);
                        el.html(video);

                    },
                    error : function(e, data){
                        el.html(e.responseJSON.error);
                    }
                });


            };


        },
        template: function (element, attrs) {
            var defaultsAttrs = {};
            for (var xx in defaultsAttrs) {
                if (attrs[xx] === undefined) {
                    attrs[xx] = defaultsAttrs[xx];
                }
            }

            var html = "<div class='fileupload'>";
            html += "</div>";
            return html;
        },


        controller: function ($scope, $element, $attrs) {
        }
    };
}]);