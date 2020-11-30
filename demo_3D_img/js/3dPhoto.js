window.onload = function () {
    transtionEvent();
}

function transtionEvent() {
    var roY = 0;
    var roX = -10;
    var xN = 0;
    var yN = 0;
    var perD = 1200;
    var timer = null;
    var timer_auto = null;
    var disX_ = 0;
    var disY_ = 0;

    var oUl = document.getElementById("ul1");
    var aImg = document.getElementsByTagName("img");
    var aLi = oUl.getElementsByTagName("li");
    var deg = 360 / aLi.length;

    //给元素添加3d效果
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].style.transition = 'all 0.5s ' + ((aLi.length - 1 - i) * 0.2) + 's'; //每张图片缩放的时间

        aLi[i].style.WebkitTransform = 'rotateY(' + deg * i + 'deg) translateZ(450px)';
        aLi[i].style.MozTransform = 'rotateY(' + deg * i + 'deg) translateZ(450px)';
    }
    //禁止图片拖到
    for (var i = 0; i < aImg.length; i++) {
        aImg[i].setAttribute("ondragstart", "return false")
    }

    //禁止拖动照片
    document.onselectstart = function () {
        return false;
    }
    document.addEventListener('touchstart', function (ev) {
        console.log("触发事件：touchstart");
        autoRoundClear();
        var ev = ev || event;
        disX_ = ev.changedTouches[0].clientX;
        disY_ = ev.changedTouches[0].clientY;
    })

    document.addEventListener('touchmove', function (ev) {
        console.log("触发事件：touchmove");
        autoRoundClear();
        var ev = ev || event;
        var disX = ev.changedTouches[0].clientX;
        var disY = ev.changedTouches[0].clientY;

        xN = disX - disX_; //滑动距离
        yN = disY - disY_;

        roY += xN * 0.1;
        roX -= yN * 0.1;

        oUl.style.WebkitTransform = 'perspective(' + perD + 'px) rotateX(' + roX + 'deg) rotateY(' +
            roY +
            'deg)';
        oUl.style.MozTransform = 'perspective(' + perD + 'px) rotateX(' + roX + 'deg) rotateY(' + roY +
            'deg)';

        disX_ = disX;
        disY_ = disY;
    });

    document.addEventListener('touchend', function (ev) {
        console.log("触发事件：touchend");
        timer = setInterval(function () {
            xN = xN * 0.99;
            yN = yN * 0.99;
            if (Math.abs(xN) <= 0.5 && Math.abs(yN) <= 0.5) { //决定滑动的周期，如果乘以 1.0，则一直滑动下去不停止
                clearInterval(timer);
            }
            roY += xN * 0.5; //Y轴转动
            roX -= yN * 0.5; //X轴转动

            //旋转
            oUl.style.WebkitTransform = 'perspective(' + perD + 'px) rotateX(' + roX +
                'deg) rotateY(' + roY + 'deg)';
            oUl.style.MozTransform = 'perspective(' + perD + 'px) rotateX(' + roX +
                'deg) rotateY(' + roY + 'deg)';
        }, 30)
    });


    document.onmousedown = function (ev) {
        console.log("触发事件：onmousedown");
        autoRoundClear();

        var ev = ev || event;

        disX_ = ev.clientX;

        disY_ = ev.clientY;

        document.onmousemove = function (ev) {
            console.log("触发事件：onmousemove");
            var ev = ev || event;
            var disX = ev.clientX;
            var disY = ev.clientY;

            xN = disX - disX_; //滑动距离
            yN = disY - disY_;

            roY += xN * 0.1;
            roX -= yN * 0.1;

            oUl.style.WebkitTransform = 'perspective(' + perD + 'px) rotateX(' + roX + 'deg) rotateY(' +
                roY +
                'deg)';
            oUl.style.MozTransform = 'perspective(' + perD + 'px) rotateX(' + roX + 'deg) rotateY(' + roY +
                'deg)';


            disX_ = ev.clientX;
            disY_ = ev.clientY;
        }

        //实现鼠标按着滑动后，松开鼠标，画面继续跟进 差值 进行滑动
        document.onmouseup = function () {
            console.log("触发事件：onmouseup");
            document.onmousemove = null;

            timer = setInterval(function () {
                xN = xN * 0.99; //递减
                yN = yN * 0.99;
                if (Math.abs(xN) <= 0.5 && Math.abs(yN) <= 0.5) { //决定滑动的周期，如果乘以 1.0，则一直滑动下去不停止
                    clearInterval(timer);
                }
                roY += xN * 0.5; //Y轴转动
                roX -= yN * 0.5; //X轴转动
                //旋转
                oUl.style.WebkitTransform = 'perspective(' + perD + 'px) rotateX(' + roX +
                    'deg) rotateY(' + roY + 'deg)';
                oUl.style.MozTransform = 'perspective(' + perD + 'px) rotateX(' + roX +
                    'deg) rotateY(' + roY + 'deg)';
            }, 30)
        }
    }
    //取消鼠标右键
    document.oncontextmenu = function () {
        return false
    }
    //自动旋转
    function autoRound() {
        timer_auto = setInterval(function () {
            roY = (roY % 360) + 0.2; //Y轴转动

            //旋转
            oUl.style.WebkitTransform = 'perspective(' + perD + 'px) rotateX(' + roX +
                'deg) rotateY(' + roY + 'deg)';
            oUl.style.MozTransform = 'perspective(' + perD + 'px) rotateX(' + roX +
                'deg) rotateY(' + roY + 'deg)';
        }, 30)
    }
    //自动旋转
    function autoRoundClear() {
        if (timer_auto) clearInterval(timer_auto);
    }
}