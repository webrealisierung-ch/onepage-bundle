/**
 * @copyright Webrealisierung GmbH 2018
 * @license LGPL-3.0+
 *
 */

function Scroller(){

    var scrollingElement =  document.scrollingElement || document.documentElement;
    var duration = 400;
    var easing = "easeInOut"; // easeIn, easeOut, easeInOut
    var offset = 0;
    var queue = [];
    var history = [];
    var running = false;

    this.setDuration = function(newDuration){
            duration = checkTypeOf(newDuration,"number");
    };

    this.getDuration = function(){
        return duration;
    };

    this.setEasing = function(newEasing){
        easing = checkTypeOf(newEasing,"number");
    };

    this.getEasing = function(){
        return easing;
    };

    this.setOffset = function(newOffset){
        offset = checkTypeOf(newOffset,"number");
    };


    this.getOffset = function(){
        return offset;
    };

    this.getPosition = function(){
        return scrollingElement.scrollTop;
    };

    var setPosition = function (position) {
        scrollingElement.scrollTop = checkTypeOf(position,"number");
    };

    this.getQueue = function (){
        return queue;
    };

    this.abort = function(){
        queue = [];
        running = false;
    };

    this.movable = function(id){
        var id = decodeURI(id);
        var anchorElement=document.getElementById(id);
        if(anchorElement != null){
            return true;
        }
        return false
    };

    this.move = function(id){
        if(id !== queue[queue.length-1]) queue.push(id);
        if(running === false) this.scroll();
    };

    this.scroll = function(animationTime, to){

        if(running !== true && to === undefined){
            var to = getDistanceToBody(document.getElementById(queue[0]));
            if( animationTime===undefined ){
                animationTime = 0;
                this.distance = Math.abs(to - scrollingElement.scrollTop);
                if(to >= this.getPosition()){
                    this.offsetElement = to - this.distance;
                    this.direction = "down";
                } else {
                    this.offsetElement = this.getPosition();
                    this.direction = "up";
                }
            }
            running = true;

        }
        if(running === true){

            switch(easing){
                case "linear":
                    var t = linear(animationTime/duration);
                    break;
                case "easeIn":
                    var t = easeIn(animationTime/duration);
                    break;
                case "easeOut":
                    var t = easeOut(animationTime/duration);
                    break;
                case "easeInOut":
                    var t = easeInOut(animationTime/duration);
                    break;
                default:
                    var t = linear(animationTime/duration);
            }

            var scrollUnit = this.distance/1*t;

            if(this.direction==="down"){
                setPosition(this.offsetElement + scrollUnit);
            } else if(this.direction==="up"){
                setPosition(this.offsetElement - scrollUnit);
            }

            setTimeout(function(self){
                if (animationTime>=duration){
                    running = false;
                    history.unshift(queue.shift());
                    if(queue.length > 0){
                        self.scroll();
                    }
                    return;
                }
                self.scroll(animationTime + 5, to);
            },5,this);
        }
    };

    var easeIn = function(t){
        return t*t*t;
    };

    var easeOut = function (t) {
        return (--t)*t*t+1
    };

    var easeInOut = function (t) {
        return t<.5 ? 2*t*t : -1+(4-2*t)*t;
    };

    var linear = function (t) {
        return t;
    };

    var getDistanceToBody = function(element,offsetTop){
        if(offsetTop===undefined){
            offsetTop = - offset;
        }

        if(element.offsetParent != undefined)
        {
            offsetTop += element.offsetTop;
            offsetTop = getDistanceToBody(element.offsetParent, offsetTop);
        }
        return offsetTop;
    };

    this.highlightActiveLink = function (links,moveEvent) {
        var sections={};
        for(var i = 0; i < links.length ; i++){
            var id=decodeURI(links[i].hash.replace("#", ""));
            if(this.movable(id)){
                if(typeof sections[id] === 'undefined') sections[id] = [];
                sections[id].push(links[i]);
                links[i].dispatchEvent(moveEvent);
            }
        }
        var scroller = this;
        window.addEventListener("scroll",function (event) {
            scroller.setActiveLink(sections);
        });
    };

    this.setActiveLink = function(linkElements){
        var windowHeight = window.innerHeight*0.25;
        for(var id in linkElements){
            var sectionElement = document.getElementById(id);
            var sectionElementHeight = sectionElement.getBoundingClientRect().height;
            var sectionElementTop = getDistanceToBody(sectionElement);
            if(this.getPosition()>=sectionElementTop - windowHeight && this.getPosition() <= sectionElementTop+sectionElementHeight - windowHeight){
                for(var i = 0; i < linkElements[id].length; i++){
                    linkElements[id][i].classList.add("active");
                    if(linkElements[id][i].hash !== '#top') window.location.hash = linkElements[id][i].hash;
                }
            } else {
                for(var i = 0; i < linkElements[id].length; i++){
                    linkElements[id][i].classList.remove("active");
                }
            }
        }
    };

    var checkTypeOf = function (element,type) {
        if(typeof element === type) return element;
        throw "Scroller Error: The expected value must be type of "+type;
    }
}