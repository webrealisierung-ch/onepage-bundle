function Onepage(selector){

    if(selector === undefined){
        this.a = document.querySelectorAll('a[href*="#"]');
    } else{
        this.a = document.querySelectorAll(selector+' a[href*="#"]');
    }

    this.duration = 400;
    this.easing = "linear";

    this.onClick = function(event,element,self){
        event.preventDefault();
        anchorElement  = document.getElementById(element.hash.replace("#", ""));
        self.scroll(document.body, anchorElement.offsetTop);
    };
    this.checkIfIdExist = function (id) {
        anchorElement=document.getElementById(id);
        if(anchorElement){
            return anchorElement;
        }
        return false
    };
    this.init = function () {
        a = this.a;
        for (var i = 0; a.length>i; i++) {
            if(a[i].href){
                anchorId=a[i].hash.replace("#", "");
                this.anchorElement=this.checkIfIdExist(anchorId);
                var that = this;
                if(this.anchorElement){
                    a[i].addEventListener("click",function(event){
                        that.onClick(event,this,that);
                    });
                }
            }
        }
    };
    this.scroll = function(element, to, startTime){
        if( startTime===undefined ){
            startTime = 0;
            this.distance = Math.abs(to - element.scrollTop);
            if(to >= element.scrollTop){
                this.offset = to - this.distance;
                this.direction = "down";
            } else {
                this.offset = element.scrollTop;
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
            element.scrollTop = this.offset + scrollUnit;
        } else if(this.direction==="up"){
            element.scrollTop = this.offset - scrollUnit;
        }

        setTimeout(function(self){
            if (startTime>=self.duration) return;
            self.scroll(element, to, startTime + 5);
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
    }
}
