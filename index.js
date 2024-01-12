    
    var lstLucky = [];
    var blackList = [];
    var lstAppeared = [];
    var lstAppeared_tmp = [];
    var time = 0;
    var flag = true;
    var currentP = null;
    var step = 0;
    var gift = document.querySelector(".gift");
    var items = document.querySelectorAll(".item");
    var screen = document.querySelector("body");
    var lstNum5 = document.querySelector(".lstG5"); 
    var lstNum5RS = document.querySelector(".lstG5-rs"); 
    var lstNum4RS = document.querySelector(".lstG4-rs"); 
    var lstNum4 = document.querySelector(".lstG4");
    var backNum = document.querySelector(".gold-logo");
    var logoLeft = document.querySelector('.logo');
    var customClass = ['','gift_1_custom','gift_2_custom','gift_3_custom','gift_4_custom','gift_5_custom'];
    var lstTitleAwa = ['','img/giai/1.png', 'img/giai/2.png','img/giai/3.png','img/giai/4.png','img/giai/5.png'];
    var lstNameAwa = ['','img/tengiai/1.png', 'img/tengiai/2.png','img/tengiai/3.png','img/tengiai/4.png','img/tengiai/5.png'];
    var lstImgAwa = ['','img/hinhgiai/1.png', 'img/hinhgiai/2.png','img/hinhgiai/3.png','img/hinhgiai/4.png','img/hinhgiai/5.png'];
   
    start();
    function start(){
        generateNumber(543);
        blackList = getCookieArray("bl");
        var test = [...getCookieArray("g5"),...getCookieArray("g4"),...getCookieArray("g3"),...getCookieArray("g2"),...getCookieArray("g1"),...getCookieArray("bl")];
        lstLucky = lstLucky.filter(itemA => !test.includes(itemA));
        console.log(lstLucky);
    }
    logoLeft.addEventListener("click",function(e){
     e.stopPropagation();
     exportToExcel();
    });
    backNum.addEventListener('click', function(e){
        if(time>0 && currentP.id != "g4" && currentP.id != "g5" && !flag ){
            time-=1;
            blackList.push(lstAppeared_tmp.pop());
            flag = true;
        }else{
            e.stopPropagation();
        }
    });
    console.log(backNum);
    screen.addEventListener("click", (e)=>{
        // console.log("tich");
        if(step==4){
            // location.reload();
            resetPage();
        }
        if(step==1){
            currentP.classList.add("movel2");
            gift.classList.add("moveGift");
            if(currentP.id == "g5"){
                gift.querySelector(".img-g").classList.add("img-g-cus");
            }
            step = 2;
        }
        if(step==2){
            step = 0;
            setTimeout(function(){
                if(currentP.id =="g5"){
                    lstNum5.classList.remove("hideNum");
                    bindingNum(5,20);
                }else if(currentP.id =="g4"){
                    lstNum4.classList.remove("hideNum");
                    bindingNum(4,12);
                }else if(currentP.id =="g3"){
                    bindingNum2(7);
                }else if(currentP.id =="g2"){
                    bindingNum2(4);
                }else if(currentP.id =="g1"){
                    // console.log("chay");
                    bindingNum2(2);
                }
            },1200);
        }
        if(step == 3){
            if(currentP.id =="g5"){
                bindingRS(5);
                lstNum5.classList.add("hideNum");
                lstNum5RS.classList.remove("hideNum");
                lstAppeared_tmp.splice(0,lstAppeared_tmp.length);
                step=4;
            }else if(currentP.id =="g4"){
                bindingRS(4);
                lstNum4.classList.add("hideNum");
                lstNum4RS.classList.remove("hideNum");
                lstAppeared_tmp.splice(0,lstAppeared_tmp.length);
                step=4;
            }else{
                let NumberLucky = document.querySelector(".NumberLucky");
                NumberLucky.innerHTML = "";
                
            }  
                 
        }
        
    })
    function bindingNum2(mx){
        
        if(time>=mx) {
            // console.log("tete");
            time=0;
            step=3;
            setCookieWithArray(currentP.id,lstAppeared_tmp);
            setCookieWithArray("bl",blackList);
            let NumberLucky = document.querySelector(".NumberLucky");
            let lstNumberLucky = document.querySelector(".lstNumberLucky");
            let text = lstAppeared_tmp.map(function(value,idx){
                if(idx%2==0 && idx!=0) return "<br>"+value;
                return value; 
            }).join(" ");
                NumberLucky.innerHTML = "";
                lstNumberLucky.innerHTML = text;
                lstNumberLucky.classList.remove("d-none-d");
                lstNumberLucky.classList.add("unhideGift");
                step=4;
        }else{
            step=2;
            let NumberLucky = document.querySelector(".NumberLucky");
            NumberLucky.innerHTML = "";
            let limit = lstLucky.length;
            let idx = Math.floor(Math.random()*limit);
            setTimeout(function(){
            NumberLucky.innerHTML = lstLucky[idx];
            lstAppeared.push(lstLucky[idx]);
            lstAppeared_tmp.push(lstLucky[idx]);
            lstLucky.splice(idx,1);
            time+=1;
            flag = false;
            console.log(time);
            },0);
        }
       
    }
    function bindingNum(g,mx){
        var a = [];
        let k =0;
        let itemNum = null;
        let NumberLucky = document.querySelector(".NumberLucky");
        
        if(g==5){
            k=10;
            itemNum = document.querySelectorAll(".lstG5 .numberItem");
        }else if(g==4){
            k=6;
            itemNum = document.querySelectorAll(".lstG4 .numberItem");
        }
        itemNum.forEach(function(it){
            it.innerHTML = "";
        });
        let limit = lstLucky.length;
        for(let i =0;i<k;i++){
            let tmp = Math.floor(Math.random()*limit);
            time+=1;
            if(a.indexOf(tmp)!=-1) --i;
            else{
                a.push(tmp);
            }
        }
        console.log("Mang index: "+a);
        let t =0;
        a.forEach(function(item,idx){
            t = (idx +1)*2000;
            setTimeout(function(){
                itemNum[idx].innerHTML = "<p class ='bindingNum'>"+lstLucky[item]+"</p>";
                lstAppeared.push(lstLucky[item]);
                lstAppeared_tmp.push(lstLucky[item]);
                if(idx == a.length-1 && time >= mx){
                    step = 3;
                    time = 0;
                    setCookieWithArray(currentP.id,lstAppeared_tmp);
                }else if(idx == a.length-1){
                    step = 2;
                    lstLucky = lstLucky.filter(function(el){
                        return !lstAppeared_tmp.includes(el);
                    });
                    console.log(lstLucky);
                }
            },t);
            
        })
    }
    function bindingRS(i){
        let lstItems =null;
        if(i==4){
            lstItems = document.querySelectorAll('.lstG4-rs .numberItem');
        }else if(i==5){
            lstItems = document.querySelectorAll('.lstG5-rs .numberItem');
        }
        lstItems.forEach(function(item,idx){
            item.innerHTML = lstAppeared_tmp[idx];
        });
    }
    function itemClick(e){
        e.stopPropagation();
        console.log(getCookieArray(e.target.id).length);
        if(getCookieArray(e.target.id).length !=0){
            return;
        }
        // e.target.querySelector('img').classList.add('d-none-d');;
        let title_img = document.querySelector('.tt');
        let logo_right = document.querySelector('.gold-logo');
        let img_g = gift.querySelector(".img-g"); 
        let giai_r = document.querySelector('.giai-r');
        let name_g = gift.querySelector(".name-g");
        let giaiImg = document.querySelector(".giai>img");
        let giai_r_Img = document.querySelector('.giai-r>img');
        title_img.classList.add('toLarge');
        giaiImg.classList.add('d-none');
        giai_r_Img.src = lstTitleAwa[e.target.getAttribute('data-idx')];
        e.target.classList.add(e.target.getAttribute('data-move'));
        name_g.classList.add(customClass[e.target.getAttribute('data-idx')]);
        img_g.style.backgroundImage = "url('"+lstImgAwa[e.target.getAttribute('data-idx')]+"')";
        giai_r.classList.add('unhideGift');
        name_g.style.backgroundImage = "url('"+lstNameAwa[e.target.getAttribute('data-idx')]+"')";
        logo_right.classList.add('unhideGift'); 
        items.forEach(function(item){
            if(item != e.target)
                item.classList.add("d-none");
            item.classList.remove("state-f"); 
            item.querySelector('img').classList.add("d-none-d");
            item.removeEventListener("click", itemClick, false);
        });
        step=1;
        currentP = e.target;
        setTimeout(function(){gift.classList.add("unhideGift");},1000);
    }
    
    items.forEach(function(item){
        item.addEventListener("click", itemClick);
    })
    function generateNumber(lm){
        for(var i = 1;i<=lm;i++){
            let strTmp = i.toString();
            if(i<10) strTmp = "00"+strTmp;
            else if(i<100) strTmp = "0"+strTmp;
            strTmp = "0"+strTmp; 
            lstLucky.push(strTmp);
        }
    }
    function setCookieWithArray(name, stringArray) {
        var combinedString = stringArray.join(',');
        document.cookie = name + "=" + combinedString + "; path=/";
    }
    function getCookieArray(name) {
        var cookieValue = getCookie(name);
    
        if (cookieValue) {
            var stringArray = cookieValue.split(',');
            var trimmedArray = stringArray.map(function(str) {
                return str.trim();
            });
    
            return trimmedArray;
        }
    
        return [];
    }
    
    function getCookie(name) {
        var cookieName = name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
    
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i].trim();
            if (cookie.indexOf(cookieName) == 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
    
        return null;
    }
    function resetPage(){
        let lstNumberLucky = document.querySelector(".lstNumberLucky");
        let giaiImg = document.querySelector(".giai>img");
        let title_img = document.querySelector('.tt');
        let giai_r = document.querySelector('.giai-r');
        let logo_right = document.querySelector('.gold-logo');
        let name_g = gift.querySelector(".name-g");
        customClass.forEach(function(item){
            if(item != '')
                name_g.classList.remove(item);
        })
        currentP.classList.remove('movel2');
        currentP.classList.remove(currentP.getAttribute('data-move'));
        gift.classList.remove('moveGift');
        if(currentP.id == "g5")
            gift.querySelector(".img-g").classList.remove("img-g-cus");
        gift.classList.remove("unhideGift");
        giai_r.classList.remove('unhideGift');
        logo_right.classList.remove('unhideGift');
        lstNumberLucky.classList.remove("unhideGift");
        lstNumberLucky.classList.add("d-none-d");
        items.forEach(function(item){
            if(item != currentP)
                item.classList.remove("d-none");
            item.classList.add("state-f"); 
            item.querySelector('img').classList.remove("d-none-d");
            item.addEventListener("click", itemClick, false);
        });
        title_img.classList.remove('toLarge');
        giaiImg.classList.remove('d-none');
        if(currentP.id == "g4"){
            lstNum4RS.classList.add("hideNum");
        }else if(currentP.id == "g5"){
            lstNum5RS.classList.add("hideNum");
        }
        lstLucky = [];
        lstAppeared = [];
        lstAppeared_tmp = [];
        time = 0;
        currentP = null;
        step = 0;
        start();
        document.querySelector(".container").classList.toggle("reset");
        document.querySelector(".container").classList.toggle("reset2");
    }



    function exportToExcel() {
        var tab_text="<table border='2px'><tr><th>Ten giai</th><th>So trung thuong</th></tr><tr><td bgcolor='#87AFC6'>Giai I</td><td bgcolor='yellow'>";
        var lst1 = getCookieArray("g1");
        tab_text=tab_text+lst1.join(" - ")+"</td></tr><tr><td bgcolor='#87AFC6'>Giai II</td><td bgcolor='yellow'>";
        lst1 = getCookieArray("g2");
        tab_text=tab_text+lst1.join(" - ")+"</td></tr><tr><td bgcolor='#87AFC6'>Giai III</td><td bgcolor='yellow'>";
        lst1 = getCookieArray("g3");
        tab_text=tab_text+lst1.join(" - ")+"</td></tr><tr><td bgcolor='#87AFC6'>Giải IV</td><td bgcolor='yellow'>";
        lst1 = getCookieArray("g4");
        tab_text=tab_text+lst1.join(" - ")+"</td></tr><tr><td bgcolor='#87AFC6'>Giải V</td><td bgcolor='yellow'>";
        lst1 = getCookieArray("g5");
        tab_text=tab_text+lst1.join(" - ")+"</td></tr>";
        tab_text=tab_text+"</table>";
        console.log(tab_text);
        tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
        tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
        tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE "); 

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
        {
            txtArea1.document.open("txt/html","replace");
            txtArea1.document.write(tab_text);
            txtArea1.document.close();
            txtArea1.focus(); 
            sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
        }  
        else                 //other browser not tested on IE 11
            sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  

        return (sa);
    }
    function deleteCookie(cookieName) {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }

    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && (event.key === 'f' || event.key === 'F')) {
            deleteCookie("g1");
            deleteCookie("g2");
            deleteCookie("g3");
            deleteCookie("g4");
            deleteCookie("g5");
            deleteCookie("bl");
            location.reload();
          event.preventDefault();
        }
      });