window.onload = (event) => {
    console.log("page is fully loaded");
    var mqtt            = null;
    var pubtopic        = "";
    var stopic          = ""; 
    // const MQTTport      = 8883;
    // const MQTTserver    = "dbs.msjrealtms.com";
    const MQTTport      = 9001;
    const MQTTserver    = "localhost"; // use 'localhost' instead of location.hostname when running app locally on PC
    let connected_flag  = 0		
    var reconnectTimeout = 2000;
	 

    const messages                  =  document.querySelector("#messages");
    const status                    =  document.querySelector("#status");


    const kitchenCard               =  document.querySelector(".kitchencard");
    const kitchenDisplay            =  document.querySelectorAll('.display_kitchen');

    const bathroomCard              =  document.querySelector(".bathroomcard");
    const bathroomDisplay           =  document.querySelectorAll('.display_bathroom');
    
    const livingroomCard            =  document.querySelector(".livingroomcard");
    const livingroomDisplay         =  document.querySelectorAll('.display_livingroom');

    const bedroomCard               =  document.querySelector(".bedroomcard");
    const bedroomDisplay            =  document.querySelectorAll('.display_bedroom');

    const studyroomCard             =  document.querySelector(".studyroomcard");
    const studyroomDisplay          =  document.querySelectorAll('.display_studyroom');

    const hallCard                  =  document.querySelector(".hallcard");
    const hallDisplay               =  document.querySelectorAll('.display_hall');

    const frontdoorCard             =  document.querySelector(".frontdoorcard");
    const frontdoorDisplay          =  document.querySelectorAll('.display_frontdoor');

    const balconydoorCard           =  document.querySelector(".balconydoorcard");
    const balconydoorDisplay        =  document.querySelectorAll('.display_balconydoor');

    const value                     =  document.querySelector("#value");
    const ID                        =  document.querySelector("#student");
    const subscribe                 =  document.querySelector("#subscribe");

    
    kitchenCard.addEventListener("click",()=>{send_message(JSON.stringify({"message":"toggle","sensor":"KITCHEN"}))});
    bathroomCard.addEventListener("click",()=>{send_message(JSON.stringify({"message":"toggle","sensor":"BATHROOM"}))});
    livingroomCard.addEventListener("click",()=>{send_message(JSON.stringify({"message":"toggle","sensor":"LIVINGROOM"}))});
    bedroomCard.addEventListener("click",()=>{send_message(JSON.stringify({"message":"toggle","sensor":"BEDROOM"}))});
    studyroomCard.addEventListener("click",()=>{send_message(JSON.stringify({"message":"toggle","sensor":"STUDYROOM"}))});
    hallCard.addEventListener("click",()=>{send_message(JSON.stringify({"message":"toggle","sensor":"HALL"}))}); 

    var gauge4 = Gauge(
        document.getElementById("gauge4"),
        {
          max: 100,
          dialStartAngle: 180,
          dialEndAngle: -90,
          viewBox: "0 0 57 57",
          value: 0
        }
      );
    
  
    onConnectionLost = ()=>{
        console.log("connection lost");
        messages.innerHTML = "Connection Lost";
        MQTTconnect();
    }

    onFailure = (message)=> {
        console.log("Failed");
        messages.innerHTML = "Connection Failed- Retrying";
        setTimeout(MQTTconnect, reconnectTimeout);
            }

    onMessageArrived = (r_message)=>{
       
        //out_msg="Message received "+r_message.payloadString+"<br>";
        //out_msg=out_msg+"Message received Topic "+r_message.destinationName;
        //console.log("Message received ",r_message.payloadString);
        try {
            msg = JSON.parse(r_message.payloadString);
           
            // value.innerHTML = parseInt(msg.Value);
            // console.log(msg);
             
            if(msg.KITCHEN !== undefined){                

                const [cardImagebox, cardDetails]   = kitchenCard.children;
                const [offIcon, onIcon]             = cardImagebox.children;
                const [detailTitle, detailValue]    = cardDetails.children;
                const [offIcon1, onIcon1, title]    = kitchenDisplay[0].children[0].children[0].children;

                detailValue.innerHTML = msg.KITCHEN;
                
                if(msg.KITCHEN === "ON"){ 

                    offIcon.style.display   = "none";
                    offIcon1.style.display  = "none";
                    
                    onIcon.style.display    = "block";
                    onIcon1.style.display   = "block";

                    // ICON COLOURS
                    onIcon.style.fill       = "yellow";
                    onIcon1.style.fill      = "yellow";

                    anime({
                        targets: kitchenDisplay, 
                        backgroundColor: 'rgba(33, 33, 33, 0)',
                        easing: 'linear',
                        duration: 1000
                      });
                }
                else if(msg.KITCHEN === "OFF"){
                    
                    offIcon.style.display   = "block";
                    offIcon1.style.display  = "block";
                    
                    onIcon.style.display    = "none";
                    onIcon1.style.display   = "none";

                    // ICON COLOURS
                    offIcon.style.fill       = "#212121";
                    offIcon1.style.fill      = "dimgray";

                    anime({
                        targets: kitchenDisplay, 
                        backgroundColor: 'rgba(33, 33, 33, 0.84)',
                        easing: 'linear',
                        duration: 1000
                      });
                }
            }
            
            if(msg.BATHROOM !== undefined){                

                const [cardImagebox, cardDetails]   = bathroomCard.children;
                const [offIcon, onIcon]             = cardImagebox.children;
                const [detailTitle, detailValue]    = cardDetails.children;
                const [offIcon1, onIcon1, title]    = bathroomDisplay[0].children[0].children[0].children;

                detailValue.innerHTML = msg.BATHROOM;
                
                if(msg.BATHROOM === "ON"){ 

                    offIcon.style.display   = "none";
                    offIcon1.style.display  = "none";
                    
                    onIcon.style.display    = "block";
                    onIcon1.style.display   = "block";

                    // ICON COLOURS
                    onIcon.style.fill       = "yellow";
                    onIcon1.style.fill      = "yellow";

                    anime({
                        targets: bathroomDisplay, 
                        backgroundColor: 'rgba(33, 33, 33, 0)',
                        easing: 'linear',
                        duration: 1000
                      });
                }
                else if(msg.BATHROOM === "OFF"){
                    
                    offIcon.style.display   = "block";
                    offIcon1.style.display  = "block";
                    
                    onIcon.style.display    = "none";
                    onIcon1.style.display   = "none";

                    // ICON COLOURS
                    offIcon.style.fill       = "#212121";
                    offIcon1.style.fill      = "dimgray";

                    anime({
                        targets: bathroomDisplay, 
                        backgroundColor: 'rgba(33, 33, 33, 0.84)',
                        easing: 'linear',
                        duration: 1000
                      });
                }
            }

            if(msg.LIVINGROOM !== undefined){                

                const [cardImagebox, cardDetails]   = livingroomCard.children;
                const [offIcon, onIcon]             = cardImagebox.children;
                const [detailTitle, detailValue]    = cardDetails.children;
                const [offIcon1, onIcon1, title]    = livingroomDisplay[0].children[0].children[0].children;

                detailValue.innerHTML = msg.LIVINGROOM;
                
                if(msg.LIVINGROOM === "ON"){ 

                    offIcon.style.display   = "none";
                    offIcon1.style.display  = "none";
                    
                    onIcon.style.display    = "block";
                    onIcon1.style.display   = "block";

                    // ICON COLOURS
                    onIcon.style.fill       = "yellow";
                    onIcon1.style.fill      = "yellow";

                    anime({
                        targets: livingroomDisplay, 
                        backgroundColor: 'rgba(33, 33, 33, 0)',
                        easing: 'linear',
                        duration: 1000
                      });
                }
                else if(msg.LIVINGROOM === "OFF"){
                    
                    offIcon.style.display   = "block";
                    offIcon1.style.display  = "block";
                    
                    onIcon.style.display    = "none";
                    onIcon1.style.display   = "none";

                    // ICON COLOURS
                    offIcon.style.fill       = "#212121";
                    offIcon1.style.fill      = "dimgray";

                    anime({
                        targets: livingroomDisplay, 
                        backgroundColor: 'rgba(33, 33, 33, 0.84)',
                        easing: 'linear',
                        duration: 1000
                      });
                }
            }

            if(msg.BEDROOM !== undefined){                

                const [cardImagebox, cardDetails]   = bedroomCard.children;
                const [offIcon, onIcon]             = cardImagebox.children;
                const [detailTitle, detailValue]    = cardDetails.children;
                const [offIcon1, onIcon1, title]    = bedroomDisplay[0].children[0].children[0].children;

                detailValue.innerHTML = msg.BEDROOM;

                let opacity = msg.BEDROOM / 100;
                gauge4.setValueAnimated(msg.BEDROOM, 2); 
                if(msg.BEDROOM >= 0 && msg.BEDROOM <= 100){  

                    anime({
                        targets: bedroomDisplay, 
                        backgroundColor: `rgba(33, 33, 33, ${opacity})`,
                        easing: 'linear',
                        duration: 1000
                      });
                }
               
            }

            if(msg.STUDYROOM !== undefined){                

                const [cardImagebox, cardDetails]   = studyroomCard.children;
                const [offIcon, onIcon]             = cardImagebox.children;
                const [detailTitle, detailValue]    = cardDetails.children;
                const [offIcon1, onIcon1, title]    = studyroomDisplay[0].children[0].children[0].children;

                detailValue.innerHTML = msg.STUDYROOM;
                
                if(msg.STUDYROOM === "ON"){ 

                    offIcon.style.display   = "none";
                    offIcon1.style.display  = "none";
                    
                    onIcon.style.display    = "block";
                    onIcon1.style.display   = "block";

                    // ICON COLOURS
                    onIcon.style.fill       = "yellow";
                    onIcon1.style.fill      = "yellow";

                    anime({
                        targets: studyroomDisplay, 
                        backgroundColor: 'rgba(33, 33, 33, 0)',
                        easing: 'linear',
                        duration: 1000
                      });
                }
                else if(msg.STUDYROOM === "OFF"){
                    
                    offIcon.style.display   = "block";
                    offIcon1.style.display  = "block";
                    
                    onIcon.style.display    = "none";
                    onIcon1.style.display   = "none";

                    // ICON COLOURS
                    offIcon.style.fill       = "#212121";
                    offIcon1.style.fill      = "dimgray";

                    anime({
                        targets: studyroomDisplay, 
                        backgroundColor: 'rgba(33, 33, 33, 0.84)',
                        easing: 'linear',
                        duration: 1000
                      });
                }
            }

            if(msg.HALL !== undefined){                

                const [cardImagebox, cardDetails]   = hallCard.children;
                const [offIcon, onIcon]             = cardImagebox.children;
                const [detailTitle, detailValue]    = cardDetails.children;
                const [offIcon1, onIcon1, title]    = hallDisplay[0].children[0].children[0].children;

                detailValue.innerHTML = msg.HALL;
                
                if(msg.HALL === "ON"){ 

                    offIcon.style.display   = "none";
                    offIcon1.style.display  = "none";
                    
                    onIcon.style.display    = "block";
                    onIcon1.style.display   = "block";

                    // ICON COLOURS
                    onIcon.style.fill       = "yellow";
                    onIcon1.style.fill      = "yellow";

                    anime({
                        targets: hallDisplay, 
                        backgroundColor: 'rgba(33, 33, 33, 0)',
                        easing: 'linear',
                        duration: 1000
                      });
                }
                else if(msg.HALL === "OFF"){
                    
                    offIcon.style.display   = "block";
                    offIcon1.style.display  = "block";
                    
                    onIcon.style.display    = "none";
                    onIcon1.style.display   = "none";

                    // ICON COLOURS
                    offIcon.style.fill       = "#212121";
                    offIcon1.style.fill      = "dimgray";

                    anime({
                        targets: hallDisplay, 
                        backgroundColor: 'rgba(33, 33, 33, 0.84)',
                        easing: 'linear',
                        duration: 1000
                      });
                }
            }

            if(msg.FRONTDOOR !== undefined){                

                const [cardImagebox, cardDetails]   = frontdoorCard.children;
                const [offIcon, onIcon]             = cardImagebox.children;
                const [detailTitle, detailValue]    = cardDetails.children;
                const [offIcon1, onIcon1, title]    = frontdoorDisplay[0].children[0].children[0].children;

                detailValue.innerHTML = msg.FRONTDOOR;
                
                if(msg.FRONTDOOR === "OPEN"){ 

                    offIcon.style.display   = "none";
                    offIcon1.style.display  = "none";
                    
                    onIcon.style.display    = "block";
                    onIcon1.style.display   = "block";

                    // ICON COLOURS
                    onIcon.style.fill       = "lightseagreen";
                    onIcon1.style.fill      = "lightseagreen";

                    anime({
                        targets: frontdoorDisplay, 
                        backgroundColor: 'rgba(33, 33, 33, 0)',
                        easing: 'linear',
                        duration: 1000
                      });
                }
                else if(msg.FRONTDOOR === "CLOSED"){
                    
                    offIcon.style.display   = "block";
                    offIcon1.style.display  = "block";
                    
                    onIcon.style.display    = "none";
                    onIcon1.style.display   = "none";

                    // ICON COLOURS
                    offIcon.style.fill       = "#212121";
                    offIcon1.style.fill      = "dimgray";

                    anime({
                        targets: frontdoorDisplay, 
                        backgroundColor: 'rgba(33, 33, 33, 0.84)',
                        easing: 'linear',
                        duration: 1000
                      });
                }
            }

            if(msg.BALCONYDOOR !== undefined){                

                const [cardImagebox, cardDetails]   = balconydoorCard.children;
                const [offIcon, onIcon]             = cardImagebox.children;
                const [detailTitle, detailValue]    = cardDetails.children;
                const [offIcon1, onIcon1, title]    = balconydoorDisplay[0].children[0].children[0].children;

                detailValue.innerHTML = msg.BALCONYDOOR;
                
                if(msg.BALCONYDOOR === "OPEN"){ 

                    offIcon.style.display   = "none";
                    offIcon1.style.display  = "none";
                    
                    onIcon.style.display    = "block";
                    onIcon1.style.display   = "block";

                    // ICON COLOURS
                    onIcon.style.fill       = "lightseagreen";
                    onIcon1.style.fill      = "lightseagreen";

                    anime({
                        targets: balconydoorDisplay, 
                        backgroundColor: 'rgba(33, 33, 33, 0)',
                        easing: 'linear',
                        duration: 1000
                      });
                }
                else if(msg.BALCONYDOOR === "CLOSED"){
                    
                    offIcon.style.display   = "block";
                    offIcon1.style.display  = "block";
                    
                    onIcon.style.display    = "none";
                    onIcon1.style.display   = "none";

                    // ICON COLOURS
                    offIcon.style.fill       = "#212121";
                    offIcon1.style.fill      = "dimgray";

                    anime({
                        targets: balconydoorDisplay, 
                        backgroundColor: 'rgba(33, 33, 33, 0.84)',
                        easing: 'linear',
                        duration: 1000
                      });
                }
            }


            if(msg.VALUE !== undefined){
                value.innerHTML = msg.VALUE;
                // data[3].state = msg.RoomC;
            }
            }
        catch(err) {
            console.log("Error while converting to json");
            console.log(err);
            }
        finally {
             console.log("Moving on");
            }       
    }

    onConnected  = (recon,url)=>{
        console.log(" in onConnected " +reconn);
        }


    onConnect  = ()=> {
        // Once a connection has been made, make a subscription and send a message.
        messages.innerHTML  = `Connected to ${MQTTserver} on port  ${MQTTport}`;
        connected_flag      = 1
        messages.innerHTML  = "<b  style='color:green'>Connected <b>";
        console.log(`on Connect  ${connected_flag}`);
        //mqtt.subscribe("sensor1");
        //message = new Paho.MQTT.Message("Hello World");
        //message.destinationName = "sensor1";
        //mqtt.send(message);
        // sub_topics();
    }

    makeid  = (length)=> {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    var IDstring = makeid(12);

    MQTTconnect  = ()=>{
        console.log(`connecting to  ${MQTTserver} ${MQTTport}`);
        messages.innerHTML = "";
        
        mqtt = new Paho.MQTT.Client( MQTTserver ,Number(MQTTport),'/ws', `elet_${IDstring}`);

        //document.write("connecting to "+ host);
        var options = {
            timeout: 3,
            onSuccess: onConnect,
            onFailure: onFailure ,
            // useSSL: true       
            };

        mqtt.onConnectionLost   = onConnectionLost;
        mqtt.onMessageArrived   = onMessageArrived;
        mqtt.onConnected        = onConnected;

        mqtt.connect(options);
        return false;
    }


 sub_topics  = ()=> {
    status.innerHTML = " ";
    if (connected_flag == 0){
        out_msg="<b  style='color:red'>Not Connected so can't subscribe</b>"
        console.log(out_msg);
        status.innerHTML = out_msg;
        setTimeout(function(){ status.innerHTML = " ";  }, 3000);
        return false;
    } 

    stopic      = `${ID.value}`; 
    pubtopic    = `${ID.value}_lab3`; 
    console.log("Subscribing to topic = "+stopic);
    mqtt.subscribe(stopic);
    return false;
}




send_message  = (msg)=>{
    status.innerHTML = "";
    
    if (connected_flag == 0){
        out_msg             = "<b style='color:red'> Not Connected so can't send </b>"
        // console.log(out_msg);
        status.innerHTML    = out_msg;
        setTimeout(function(){ status.innerHTML = " ";  }, 3000);
        return false;
    }
    else{            
        var message             = new Paho.MQTT.Message(msg);
        message.destinationName = pubtopic;
        mqtt.send(message);
        return false;
    }
 
     
}

subscribe.addEventListener('click',(event)=>{
    event.preventDefault();
    sub_topics();
});

// CONNECT MQTT 
MQTTconnect();


 




  };