(function (global) {
    var canvas = new fabric.Canvas('canvas');

// 对<img> 元素开始到结束事件控制; <img> 元素放置在canvas容器内.
    function handleDragStart(e) {
        [].forEach.call(images, function (img) {
            img.classList.remove('img_dragging');
        });
        this.classList.add('img_dragging');
    }

//拽起
    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault(); //  允许drop到canvas容器内
        }

        e.dataTransfer.dropEffect = 'copy';

        return false;
    }

//拽住
    function handleDragEnter(e) {
        this.classList.add('over');
    }

//松手
    function handleDragLeave(e) {
        this.classList.remove('over');
    }
//放下
    function handleDrop(e) {

        e.stopPropagation();
        e.preventDefault();


        if (e.dataTransfer.files.length > 0) {

            var files = e.dataTransfer.files;
            for (var i = 0, f; f = files[i]; i++) {

                if (f.type.match('image.*')) {
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        var img = document.createElement('img');
                        img.src = evt.target.result;

                        var newImage = new fabric.Image(img, {
                            width: 100,
                            height: 100,
                            left: e.layerX,
                            top: e.layerY
                        });
                        canvas.add(newImage);
                    };
                    reader.readAsDataURL(f);
                }
            }
        }
        else {
            var img = document.querySelector('#images img.img_dragging');
            var newImage = new fabric.Image(img, {
                width: img.width,
                height: img.height,
                left: e.layerX,
                top: e.layerY
            });
            canvas.add(newImage);
        }

        return false;
    }

//完事
    function handleDragEnd(e) {
        [].forEach.call(images, function (img) {
            img.classList.remove('img_dragging');
        });
    }

//生成事件（找事）
    if (Modernizr.draganddrop) {

        var images = document.querySelectorAll('#images img');
        [].forEach.call(images, function (img) {
            img.addEventListener('dragstart', handleDragStart, false);
            img.addEventListener('dragend', handleDragEnd, false);
        });
        var canvasContainer = document.getElementById('canvas-container');
        canvasContainer.addEventListener('dragenter', handleDragEnter, false);
        canvasContainer.addEventListener('dragover', handleDragOver, false);
        canvasContainer.addEventListener('dragleave', handleDragLeave, false);
        canvasContainer.addEventListener('drop', handleDrop, false);
    } else {
        alert("This browser doesn't support the HTML5 Drag and Drop API.");
    }
//干掉选中的对象
    var removeSelectedEl = document.getElementById('remove-selected');
    removeSelectedEl.onclick = function () {
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup();
        if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();
            canvas.discardActiveGroup();
            objectsInGroup.forEach(function (object) {
                canvas.remove(object);
            });
        }
        else if (activeObject) {
            canvas.remove(activeObject);
        }
    };
//加入文字
    var text = '在此加字';
    document.getElementById('add-text').onclick = function () {
        var textSample = new fabric.Text(text, {
            left: 100,
            top: 100,
            fontFamily: 'helvetica',
            angle: 0,
            fill: 'rgb(0,0,0)',
            scaleX: 1,
            scaleY: 1,
            fontWeight: '',
            originX: 'left',
            hasRotatingPoint: true
        });
        canvas.add(textSample);
    };
//img,svg,json转换
    document.getElementById('rasterize').onclick = function () {
        if (!fabric.Canvas.supports('toDataURL')) {
            alert('This browser doesn\'t provide means to serialize canvas to an image');
        }
        else {
            var data = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            window.location.href = data;
            window.open(canvas.toDataURL('png'));
//            alert(canvas.toDataURL())
//            window.open(canvas.toDataURL('png'));
        }
    };
    document.getElementById('rasterize-svg').onclick = function () {
        window.open('data:image/svg+xml;utf8,' + canvas.toSVG());
    };
    document.getElementById('rasterize-json').onclick = function () {
        alert(JSON.stringify(canvas));
    };
//svg load excute
    document.getElementById('load-svg').onclick = function() {
        var svg = document.getElementById('svg-console').value;
        fabric.loadSVGFromString(svg, function(objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options);
            canvas.add(obj).centerObject(obj).renderAll();
            obj.setCoords();
        });
    };

    document.getElementById('load-svg-without-grouping').onclick = function() {
        var svg = document.getElementById('svg-console').value;
        fabric.loadSVGFromString(svg, function(objects) {
            canvas.add.apply(canvas, objects);
            canvas.renderAll();
        });
    };
//改变图片层次
     document.getElementById('selected-forward').onclick = function () {
        var activeObject = canvas.getActiveObject();
            activeObject.bringForward();
     };
     document.getElementById('selected-tofront').onclick = function () {
        var activeObject = canvas.getActiveObject();
        activeObject.bringToFront();
     };
    /*canvas.on({
        'object:selected': function() {
            canvas_object = canvas.item(index);
            canvas_object.bringForward();
        }
    });*/
   /* canvas.on({
        'object:moving': onChange,
        'object:scaling': onChange,
        'object:rotating': onChange
    });

    function onChange(options) {
        options.target.setCoords();
        canvas.forEachObject(function(obj) {
            if (obj === options.target) return;
            obj.setOpacity(options.target.intersectsWithObject(obj) ? 0.5 : 1);
        });
    }*/
//改变文字内容和样式
    /*
     $(document).keydown(function(e){
     var keyPressed = String.fromCharCode(e.which);
     var text = canvas.getActiveObject();
     if (text)
     {
     var newText = '';
     var stillTyping = true;
     if (e.which == 27) //esc
     {
     if (!text.originalText) return; //if there is no original text, there is nothing to undo
     newText = text.originalText;
     stillTyping = false;
     }
     //if the user wants to make a correction
     else
     {
     //Store the original text before beginning to type
     if (!text.originalText)
     {
     text.originalText = text.text;
     }
     //if the user wants to remove all text, or the element entirely
     if (e.which == 46) //delete
     {
     activeObject.element.remove(true);
     return;
     }
     else if (e.which == 16) { //shift
     newText = text.text;
     }
     else if (e.which == 8) //backspace
     {
     e.preventDefault();
     newText = text.text.substr(0, text.text.length - 1);
     }
     else if (e.which == 13) //enter
     {
     //canvas clear selection
     canvas.discardActiveObject();
     canvas.renderAll();
     canvasBeforeSelectionCleared({ memo: { target: text} });

     newText = text.text;
     stillTyping = false;
     }
     //if the user is typing alphanumeric characters
     else if (
     (e.which > 64 && e.which < 91) || //A-Z
     (e.which > 47 && e.which < 58) || //0-9
     (e.which == 32) || //Space
     (keyPressed.match(/[!&()"'?-]/)) //Accepted special characters
     )
     {
     if (text.text == text.originalText) text.text = '';
     if (keyPressed.match(/[A-Z]/) && !e.shiftKey)
     keyPressed = keyPressed.toLowerCase();
     newText = text.text + keyPressed;
     }
     }
     text.set({ text: newText }); //Change the text
     canvas.renderAll(); //Update the canvas

     if (!stillTyping)
     {
     this.text.originalText = null;
     }
     }
     });*/
})(this);