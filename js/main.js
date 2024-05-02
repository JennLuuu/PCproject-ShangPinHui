var thumbnailData = goodData.imgsrc;
//00. 拿到数据并渲染出来
(function () {
  //引入的data.js提供了一个全局变量goodData,代表我们请求回来的数据
  //1. 把缩略图数据展示出来
  var oList = document.querySelector(
    ".content_inner .detail .detail_img .img_scroll ul"
  );
  thumbnailData.forEach(function (item) {
    var newLi = document.createElement("li");
    var newImg = new Image();
    newImg.src = item.s;
    newLi.appendChild(newImg);
    oList.appendChild(newLi);
  });

  //2.给大图和中图,也展示对应的下标为0的图片
  var oMiddleImg = document.querySelector(
    ".content_inner .detail .detail_img .preview .smallArea img"
  );
  var oBigImg = document.querySelector(
    ".content_inner .detail .detail_img .preview .bigArea img"
  );
  oMiddleImg.src = thumbnailData[0].m;
  oBigImg.src = thumbnailData[0].b;
})();
//01. 放大镜效果
(function () {
  var oTarget = document.querySelector(
    ".content_inner .detail .detail_img .preview .target"
  );
  var oMask = document.querySelector(
    ".content_inner .detail .detail_img .preview .mask"
  );
  var oBigArea = document.querySelector(
    ".content_inner .detail .detail_img .preview .bigArea"
  );
  var oBigImg = document.querySelector(
    ".content_inner .detail .detail_img .preview .bigArea img"
  );

  //鼠标移动的事件
  var previewHandler = function (e) {
    oBigArea.style.display = "block";
    oMask.style.display = "block";
    //获取鼠标位置
    var maskLocation = {
      x: e.offsetX - oMask.offsetWidth / 2,
      y: e.offsetY - oMask.offsetHeight / 2,
    };

    //判断临界值
    if (maskLocation.x <= 0) {
      maskLocation.x = 0;
    } else if (maskLocation.x >= oTarget.offsetWidth - oMask.clientWidth) {
      maskLocation.x = oTarget.offsetWidth - oMask.clientWidth;
    }
    if (maskLocation.y <= 0) {
      maskLocation.y = 0;
    } else if (maskLocation.y >= oTarget.offsetHeight - oMask.clientHeight) {
      maskLocation.y = oTarget.offsetHeight - oMask.clientHeight;
    }
    //赋值给mask
    oMask.style.left = maskLocation.x + "px";
    oMask.style.top = maskLocation.y + "px";

    ////放大镜图片展示
    //获取比例
    var scale =
      (oTarget.clientWidth - oMask.offsetWidth) /
      (oBigImg.clientWidth - oBigArea.offsetWidth);
    var bigImgMove = {
      x: maskLocation.x / scale,
      y: maskLocation.y / scale,
    };
    //大图移动
    oBigImg.style.left = -bigImgMove.x + "px";
    oBigImg.style.top = -bigImgMove.y + "px";
  };

  oTarget.onmousemove = my.throttle(previewHandler, 1000 / 60);
  oTarget.onmouseleave = function () {
    oBigArea.style.display = "none";
    oMask.style.display = "none";
  };
})();

//02. 轮播图效果
(function () {
  var oLeftBtn = document.querySelector(
    ".content_inner .detail .detail_img .img_scroll p:nth-child(1)"
  );
  var oRightBtn = document.querySelector(
    ".content_inner .detail .detail_img .img_scroll p:nth-child(2)"
  );
  var oList = document.querySelector(
    ".content_inner .detail .detail_img .img_scroll ul"
  );
  var oListItems = document.querySelectorAll(
    ".content_inner .detail .detail_img .img_scroll ul li"
  );

  //ul位移的初始位置
  var listMove = 0;
  //每次走两张图
  var everyNum = 2;
  //每次走的距离
  var everyStep = everyNum * oListItems[0].offsetWidth;
  //绑定点击事件
  oRightBtn.onclick = function () {
    listMove -= everyStep;

    //临界值判断
    var canMove = (oListItems.length - 6) * oListItems[0].offsetWidth;
    if (listMove <= -canMove) {
      listMove = -canMove;
    }

    //赋值移动
    oList.style.transform = "translateX(" + listMove + "px)";
  };
  oLeftBtn.onclick = function () {
    listMove += everyStep;

    //临界值判断
    if (listMove >= 0) {
      listMove = 0;
    }

    //赋值移动
    oList.style.transform = "translateX(" + listMove + "px)";
  };

  //点击图片展示
  oListItems.forEach(function (item) {
    item.onclick = function (e) {
      e;
    };
  });
})();

//03. 轮播图点击展示到大图上
(function () {
  var oBigImg = document.querySelector(
    ".content_inner .detail .detail_img .preview .bigArea img"
  );
  var oListItems = document.querySelectorAll(
    ".content_inner .detail .detail_img .img_scroll ul li"
  );
  var oMiddleImg = document.querySelector(
    ".content_inner .detail .detail_img .preview .smallArea img"
  );

  oListItems.forEach(function (item, index) {
    item.onclick = function () {
      oMiddleImg.src = thumbnailData[index].m;
      oBigImg.src = thumbnailData[index].b;
    };
  });
})();

//04. 将获取到的手机详细数据动态渲染到页面上
(function () {
  var oPriceBox = document.querySelector(
    ".content_inner .detail .detail_msg_top"
  );
  var oData = goodData.goodsDetail;

  var str = `
    <h3>${oData.title}</h3>
                <p class="tuiJian">
                ${oData.recommend}
                </p>
                <div class="price">
                  <div class="price_detail">
                    <p>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</p>
                    <p><span>￥<em>${oData.price}</em>元</span></p>
                  </div>
                  <div class="price_buy">
                    <p>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</p>
                    <p>
                      <span>${oData.promoteSales.type}</span
                      >${oData.promoteSales.content}
                    </p>
                  </div>
                </div>
                <div class="support">
                  <p>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</p>
                  <p>${oData.support}</p>
                </div>
                <div class="peiSong">
                  <p>配&nbsp;送&nbsp;至</p>
                  <p>${oData.address}</p>
                </div>
    `;

  oPriceBox.innerHTML = str;
})();

//05.将获取到的选择数据渲染到页面上
(function () {
  var oDetailMsgBtm = document.querySelector(
    ".content_inner .detail .detail_msg_btm"
  );
  //拿到要放入页面的数据
  var oDetail = goodData.goodsDetail.crumbData;

  //遍历数据,得到dl
  oDetail.forEach(function (item) {
    //创建dl
    var newDl = document.createElement("dl");
    //创建dt
    var newDt = document.createElement("dt");
    //将数据中的每一个title放入到dt中
    newDt.textContent = item.title;
    //将dt放入到dl中
    newDl.appendChild(newDt);

    //遍历每一个item的data数组
    item.data.forEach(function (item) {
      //创建dd
      var newDd = document.createElement("dd");
      //将数据中的type放入到每一个dd中
      newDd.textContent = item.type;

      //将dd放入到dl中
      newDl.appendChild(newDd);
    });
    //将dl填入到页面容器中
    oDetailMsgBtm.appendChild(newDl);
  });
})();

//06. 插入导航区内容
(function () {
  //获取数据要展示的页面元素
  var oContentNav = document.querySelector(".content_inner .content_nav span");
  //获取要展示的数据
  var oNavData = goodData.path;

  //创建一个空字符串,用来存放每次遍历后生成的a标签
  var str = ``;
  //遍历数据,每个item都生成一个a标签
  oNavData.forEach(function (item, index) {
    var aMsg = item.title;
    var aHref = item.url;

    //判断元素是否为最后一个元素,是则不加分隔符/
    if (index === oNavData.length - 1) {
      str += `
        <a href="${aHref}"> ${aMsg} </a>
        `;
    } else {
      str += `
        <a href="${aHref}"> ${aMsg} </a>&nbsp; / &nbsp;
        `;
    }

    //将拼接好的字符串放到页面上
    oContentNav.innerHTML = str;
  });
})();

//07. 配置选择后放入页面中
(function () {
  //获取页面元素
  var oShow = document.querySelector(".content_inner .detail .detial_msg_show");
  var oDls = document.querySelectorAll(
    ".content_inner .detail .detail_msg_btm dl"
  );

  var contentArr = new Array(oDls.length);
  //oDls的下标,就是数组的下标,通过下标决定dd的内容是插入数组还是覆盖数组的原有值

  //遍历每个dl中的每个dd,当点击dd时,生成新的div,并放入oShow中
  oDls.forEach(function (item, index) {
    //当前item为每个dl

    var oDds = item.getElementsByTagName("dd");
    //给每一个dd绑定点击事件
    //因为oDds不是数组,不能用foreach,所以就给他强制转换成数组

    Array.from(oDds).forEach(function (item) {
      //当前item为每个dd
      //给每个dd绑定点击事件
      //将点击后获取到的dd的内容放入一个数组中,通过数组控制页面的信息渲染

      item.onclick = function () {
        //先清除所有dd上的样式,再给点击的对象添加样式
        //要想清除所欲dd上的样式,就要遍历所有的dd

        Array.from(oDds).forEach(function (item) {
          item.style.color = "#666";
        });
        this.style.color = "red";
        //当前的this就是点击的item,即当前的dd

        //将当前item(dd)的内容推进数组中
        contentArr[index] = item.textContent;
        // console.log(contentArr);

        //每次点击都清空oShow中的内容,重新将contentArr中的内容渲染到oShow中
        oShow.textContent = "";

        //遍历数组,将数组中的内容渲染到oShow中
        contentArr.forEach(function (item, index) {
          //生成一个新的div
          var newDiv = document.createElement("div");
          //生成一个新的span用来存放dd中的内容
          var newSpan = document.createElement("span");
          newSpan.textContent = item;
          // console.log(newSpan.textContent);
          //将newSpan推入newDiv中
          newDiv.appendChild(newSpan);

          //生成一个新的a标签
          var newA = document.createElement("a");
          //给a标签一个自定义属性,为了存放点的到底是哪个a
          //要通过事件委托来写a的点击删除事件,不然每生成一个a,就专门生成一个点击事件,比较费劲
          newA.dataset.myIndex = index;
          newA.textContent = "X";
          newDiv.appendChild(newA);

          oShow.appendChild(newDiv);
        });
      };
    });
  });

  //给每个X绑定点击删除事件,删除div
  //事件委托,将点击删除事件委托给oShow
  oShow.onclick = function (e) {
    //判断:只有点击的对象是a标签,才会删除当前div
    if (e.target.nodeName !== "A") {
      return;
    }
    //删除数组中的内容
    delete contentArr[e.target.dataset.myIndex];
    //事件触发时,删除页面div元素
    e.target.parentNode.remove();

    //删除选中时改变的样式
    //获取,数组中被删除内容,所对应的dl,中的所有dd元素,改变其样式
    var allDd = oDls[e.target.dataset.myIndex].getElementsByTagName("dd");
    Array.from(allDd).forEach(function (item) {
      item.style.color = "#666";
    });
  };
})();

//08. 点击添加购买数量
(function () {
  //获取页面元素
  var oIpt = document.querySelector(
    ".content_inner .detail .addAndCar .add input"
  );
  var oJia = document.querySelector(
    ".content_inner .detail .addAndCar .add #jia"
  );
  var oJian = document.querySelector(
    ".content_inner .detail .addAndCar .add #jian"
  );

  //用户上一次输入的数据
  var lastValue = 0;

  //给按钮绑定点击事件
  oJia.onclick = function () {
    lastValue++;
    oIpt.value = lastValue;
  };
  oJian.onclick = function () {
    lastValue--;
    //临界值判断
    if (lastValue <= 1) {
      lastValue = 1;
    }
    oIpt.value = lastValue;
  };

  //获取用户输入数据,并进行限制
  oIpt.oninput = function () {
    var userVal = oIpt.value;

    //判断用户输入的是否为纯数字,只将纯数字放入value中
    //如果用户输入的是非数字,则将上一次输入的数字放入value中
    var newVal = parseInt(userVal);
    if (newVal) {
      oIpt.value = newVal;
      lastValue = newVal;
    } else {
      oIpt.value = lastValue;
    }
  };
})();

//生成选项卡的构造函数
function Tab(titles, contents) {
  this.titles = titles;
  this.contents = contents;

  var _this = this;
  //遍历所有的titles,清除上面的样式,和对应的content的样式,再给点击的对象添加样式
  //遍历标题列表,给每个标题绑定点击事件
  titles.forEach(function (item, index) {
    item.onclick = function () {
      //调用选项卡切换函数
      //因为选项卡的结构切换较复杂,所以可以将函数写在外面,这里只是调用
      //因为想让当前点击的对象是tabTurn的this,所以就需要将当前的this(item)传给tabTurn

      //想要让tabTurn上的this指向构造函数的实例化对象,就要让实例化对象this调用tabTurn
      //因为在当前function中是拿不到实例化对象this的,所以需要var一个变量接一下
      _this.tabTurn(this, index);
      // console.log(_this);
    };
  });
}

//选项卡切换函数
Tab.prototype.tabTurn = function (target, index) {
  //在当前函数中,是拿不到titles和contents的,所以需要将titles和contents放在实例对象身上
  var _this = this;
  // console.log(this);//这里出现log结果是window时,是因为小括号包含的函数前后没有写分号
  this.titles.forEach(function (item, index) {
    item.classList.remove("choose");
    //foreach中的this不是目标this,所以需要var个变量接一下this在这里用
    _this.contents[index].classList.remove("choose");
  });
  target.classList.add("choose");
  this.contents[index].classList.add("choose");
};

//09. 选项卡切换
(function () {
  //生成选项卡,两个重要因素,所有的标题,所有的和标题一一对应的内容的展示区
  var oTitles = document.querySelectorAll(".recommend_inner .left .title div");
  var oContents = document.querySelectorAll(
    ".recommend_inner .left .contents div"
  );
  new Tab(oTitles, oContents);

  var olis = document.querySelectorAll(
    ".recommend_inner .right .describes .goodsDes li"
  );
  var oCons = document.querySelectorAll(
    ".recommend_inner .right .describes .content > div"
  );

  new Tab(olis, oCons);
})();

//10. 侧边栏点击效果
(function () {
  //获取页面元素
  var oShowOuter = document.querySelector(".showOuter");
  var oShowClick = document.querySelector(".show .click");

  //给元素绑定点击事件
  //判断点击是要展开还是收回
  //默认是收回的
  var flag = false;
  //index用来标识点击的次数
  var index = 1;
  oShowClick.onclick = function () {
    index++;
    if (index % 2 === 0) {
      //展开
      flag = true;
    } else {
      flag = false;
    }

    if (flag) {
      oShowOuter.style.right = 0;
    } else {
      oShowOuter.style.right = "-294px";
    }
  };
})();

//11. 侧边栏小图标鼠标移入展示
(function () {
  //获取页面元素
  var oLis = document.querySelectorAll(".showOuter ul li");

  //给ul绑定鼠标移入事件
  //给每一个li绑定鼠标移入事件
  oLis.forEach(function (item) {
    item.onmouseenter = function (e) {
      // console.log(e.target);
      // console.log(e.target.children);
      // console.log(Array.from(e.target.children)[0]);
      Array.from(e.target.children)[0].style.left = "-62px";
    };
    item.onmouseleave = function (e) {
      Array.from(e.target.children)[0].style.left = "0px";
    };
  });
})();
