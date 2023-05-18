function Onepage(Mover,selector){

    if(Mover === undefined){
        this.Mover = new Scroller();
    }
    else{
        this.Mover = Mover;
    }

    if(selector === undefined){
        var a = document.querySelectorAll('a[href*="#"]');
    } else{
        var a = document.querySelectorAll(selector+' a[href*="#"]');
    }

    this.offsetElement = 0;

    this.requiredMethods = [
        'setDuration',
        'getDuration',
        'setEasing',
        'getEasing',
        'getPosition',
        'move',
        'movable',
        'getQueue',
        'abort'
    ];

    var moveEvent = new Event('move');

    this.init = function(){
        try{
            this.checkMoverMethods(this.Mover);

            this.Mover.highlightActiveLink(a,moveEvent);

            for (var i = 0; a.length>i; i++) {
                var id = getHashFromLink(a[i]);
                if(a[i].href && this.Mover.movable(id) !== false){

                    var onepage = this;

                    a[i].addEventListener("click",function(event){
                        event.preventDefault();
                        onepage.Mover.move(getHashFromLink(this));
                        //window.location.hash = this.hash;
                    });
                }
            }


        }
        catch (e){
            console.log(e);
        }
    };

    getHashFromLink = function(link){
        return decodeURI(link.hash.replace("#", ""));
    };

}

Onepage.prototype = {
    constructor: Onepage,
    checkMoverMethods: function(Mover){
        for(i=0;this.requiredMethods.length > i;i++){
            if(!Mover.hasOwnProperty(this.requiredMethods[i])){
                throw 'Onepage Framework Error : Method '+this.requiredMethods[i]+' must be implemented!'
            }
        }
        return true;
    }
};
