/**
 * @copyright Webrealisierung GmbH 2017
 * @license LGPL-3.0+
 *
 */

Scroller.duration; // default 400

Scroller.easing; // default "linear"

Scroller.scroll(pixel_value); // return true/false;

Scroller.position(); // return int with the actual scrollPosition;

Scroller.queue(); // return {} with the open scroll actions

Scroller.abort(); // return true/false Abort the current and upcomming scroll actions in the queue

Scroller.search(); // return true/false Search a given HTML Element




function Scroller(){

    //Internal properies

    //Config properties

    this.getPosition = function(){

    };

    this.scroll = function(){

    };

    this.
}






function Scroller(selector){

    // Internal properties
    this.scrollingElement =  document.scrollingElement || document.documentElement;
    this.offsetElement = 0;

    // Config properties
    this.duration = 400;
    this.easing = "linear";
    this.offset = 0;

    /**
     * @constructor
     */
    this.init = function () {
        var a = this.a;

        for (var i = 0; a.length>i; i++) {
            if(a[i].href){
                anchorId=a[i].hash.replace("#", "");
                var that = this;
                if(this.checkIfIdExist(decodeURI(anchorId))){
                    a[i].addEventListener("click",function(event){
                        that.onClick(event,this,that);
                    });
                }
            }
        }
    };

    /**
     * Prevent the default click event of a given element and
     * add the scroll function.
     * @param event
     * @param element
     * @param self
     */
    this.onClick = function(event,element,self){
        event.preventDefault();
        anchorElement  = document.getElementById(decodeURI(element.hash.replace("#", "")));
        var offsetTop = this.findBody(anchorElement);
        self.scrollTo(this.scrollingElement, offsetTop);
    };

    /**
     * Todo: Implement the function
     */
    this.onScroll = function(){
        Scroller.setPosition();
    };

    /**
     * Check of a element with the given id is existing in the document
     * @param {sting} id - Name of a css id
     * @return {boolean} true if the element exist, otherwise false
     */
    this.checkIfIdExist = function (id) {
        anchorElement=document.getElementById(id);
        if(anchorElement){
            return true;
        }
        return false
    };

    /**
     * Scroll animation to a given Element
     * @param element
     * @param to
     * @param startTime
     */
    this.scrollTo = function(element, to, startTime){
        if( startTime===undefined ){
            startTime = 0;
            this.distance = Math.abs(to - element.scrollTop);
            if(to >= element.scrollTop){
                this.offsetElement = to - this.distance;
                this.direction = "down";
            } else {
                this.offsetElement = element.scrollTop;
                this.direction = "up";
            }
        }
        switch(this.easing){
            case "linear":
                t = this.linear(startTime/this.duration);
                break;
            case "easeIn":
                t = this.easeIn(startTime/this.duration);
                break;
            case "easeOut":
                t = this.easeOut(startTime/this.duration);
                break;
            case "easeInOut":
                t = this.easeInOut(startTime/this.duration);
                break;
            default:
                t = this.linear(startTime/this.duration);
        }

        scrollUnit = this.distance/1*t;

        if(this.direction==="down"){
            element.scrollTop = this.offsetElement + scrollUnit;
        } else if(this.direction==="up"){
            element.scrollTop = this.offsetElement - scrollUnit;
        }

        setTimeout(function(self){
            if (startTime>=self.duration) return;
            self.scrollTo(element, to, startTime + 5);
        },5,this);
    };

    this.easeIn = function(t){
        return t*t*t;
    };

    this.easeOut = function (t) {
        return (--t)*t*t+1
    };

    this.easeInOut = function (t) {
        return t<.5 ? 2*t*t : -1+(4-2*t)*t;
    };

    this.linear = function (t) {
        return t;
    };

    this.findBody = function(element,offsetTop){

        if(offsetTop===undefined){
            offsetTop = - this.offset;
        }

        if(element.offsetParent != undefined)
        {
            offsetTop += element.offsetTop;
            offsetTop = this.findBody(element.offsetParent, offsetTop);
        }
        return offsetTop;
    }
}