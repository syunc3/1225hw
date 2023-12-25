var sound2
function preload(){
  sound2 = loadSound("music2.mp3") //先把音樂檔載入到sound2程式碼中
}

var face_clr = "ffcdb2-ffb4a2-e5989b-b5838d-6d6875-a3a380-d6ce93-efebce-d8a48f-bb8588".split("-").map(a=>"#"+a)
var mouth_clr = "f7b267-f79d65-f4845f-ffe6a7-ffb703-f4a261".split("-").map(a=>"#"+a)

var pos_x = []
var pos_y = []
var sizes = []
var colors = []
var v_y = [] //移動速度
var v_x = []
var txts //宣告一個變數，txts變數存放著文字框內容
var face_move_var = false //臉部移動條件，如果為true，臉部就會移動

function setup() {
  createCanvas(windowWidth,windowHeight);

    analyzer = new p5.Amplitude();
    analyzer.setInput(sound2)

   //文字框設定
   inputElement = createInput("411730723") //產生一個文字方塊，" "內為預設顯示文字
   inputElement.position(10,10) //將文字方塊放在座標(10,10)位置
   inputElement.size(140,40)    //文字框的寬與高
   //以下style可google搜尋html input css 找到相關資料
   inputElement.style("font-size","20px") //框內文字大小
   inputElement.style("color","#fff") //文字顏色
   inputElement.style("background","#2b2d42") //文字框背景顏色

   //移動按鈕的設定
   btnMoveElement = createButton("移動")
   btnMoveElement.position(170,10)
   btnMoveElement.size(80,40)
   btnMoveElement.style("font-sive","20px")
   btnMoveElement.style("color","#fff")
   btnMoveElement.style("background","#8d99ae")
   btnMoveElement.mousePressed(face_move)

   //暫停鈕的設定
   btnMoveElement = createButton("暫停")
   btnMoveElement.position(270,10)
   btnMoveElement.size(80,40)
   btnMoveElement.style("font-sive","20px")
   btnMoveElement.style("color","#fff")
   btnMoveElement.style("background","#8d99ae")
   btnMoveElement.mousePressed(face_stop)

     //radio 選紐的設定，多個選項，只能選一個
    radioElement = createRadio()
    radioElement.option("暫停")
    radioElement.option("旋轉")
    radioElement.option("移動")
    radioElement.position(370,10) //位置
    radioElement.size(200,40)     //寬高
    radioElement.style("font-size","20px") //按鈕內的文字大小
    radioElement.style("color","#fff") //文字顏色
    radioElement.style("background","#8d99ae") //按鍵背景顏色
    
    //播放按鈕
    btnPlayElement = createButton("播放")
    btnPlayElement.position(700,10)
    btnPlayElement.size(80,40)
    btnPlayElement.style("font-size","20px")
    btnPlayElement.style("color","#fff")
    btnPlayElement.style("background","#8d99ae")
    btnPlayElement.mousePressed(play_go)
    //音樂停止
    btnPlayElement = createButton("音樂停止")
    btnPlayElement.position(800,10)
    btnPlayElement.size(100,40)
    btnPlayElement.style("font-size","20px")
    btnPlayElement.style("color","#fff")
    btnPlayElement.style("background","#8d99ae")
    btnPlayElement.mousePressed(play_stop)

  // for(var i=0;i<10;i=i+1){
  //   drawface(face_clr[int(random(face_clr.length))],mouth_clr[int(random(mouth_clr.length))],random(0.3,0.8))
  // }
}

function draw(){
  background("edf2f4");
  var mode = radioElement.value()
  for (var i=0;i<pos_x.length;i=i+1)
  {
    push()
    txts = inputElement.value();
      translate(pos_x[i],pos_y[i])
      if(mode=="旋轉"){
        rotate(sin(frameCount/25*v_y[i])) //如果旋轉的角度一正一負
      }

      drawface(colors[i],0,sizes[i])
    pop()
    if(face_move_var || mode=="移動"){
      pos_y[i] = pos_y[i] + v_y[i] //物件移動的指令
    }

    if(pos_y[i]>height,pos_y[i]<0)
    {
      pos_x.splice(i,1)
      pos_y.splice(i,1)
      sizes.splice(i,1)
      colors.splice(i,1)
      v_y.splice(i,1)
    }
    
  }
}


function drawface(face_clr=("#c1121f"),mouth_clr=("#FFB703"),size=0.6){ //畫一個臉
  push()
    // translate(random(width),random(height)) //把原點(0,0)移動到(600,250)的位置
    scale(size)
    //文字框的顯示格式
    fill("#8d99ae")
    textSize(50)
    text(txts,-100,250)

    //臉部
    fill(face_clr)
    ellipse(0,0,450,400)  //臉 (x,y,寬,高)
    line(0,-250,0,-200)   //頭髮2
    line(10,-250,1,-200)  //頭髮3
    line(-10,-250,-1,-200)//頭髮1
    
    //眼睛
    fill(255)
    ellipse(-80,-50,130)   //左眼
    ellipse(80,-50,130,)  //右眼
    
    //嘴巴
    fill(mouth_clr)
    ellipse(-100,110,400,150)  //嘴
    line(-280,115,50,115)
    
    //眼珠
    fill(0)
    ellipse(-60,-50,90)  //左眼珠
    ellipse(55,-50,80)  //右眼珠
  pop()
}

function mousePressed(){
  if(mouseY>60){
    pos_x.push(mouseX)
    pos_y.push(mouseY)
    sizes.push(random(0.1,0.7))
    colors.push(face_clr[int(random(face_clr.length))])
    v_y.push(random(-2,2))
  }

}

//臉部移動
function face_move(){
  face_move_var = true

}
//臉部移動停止
function face_stop(){
  face_move_var = false
}

// function voice_go(){
//   myRec.onResult = showResult //取的語音辨識執行function showResult
//   myRec.start() //開始辨識
// }

//音樂播放
function play_go(){
  sound2.play()
}
//音樂停止
function play_stop(){
  sound2.stop()
}
