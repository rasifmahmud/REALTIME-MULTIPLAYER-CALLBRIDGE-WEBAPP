function display_start(){
	//THESE ARE FOR SCROLLING TO CERTAIN HEIGHT
	//var scrollH = ;
	window.scrollTo(0, 0);
	window.scrollTo(0, window.innerHeight*0.23);    //162px is target

	move_card_suit();
}

function move_card_suit(){
	//This is for animating to place card_suit in center
	//DESIRED POSITION
	//top: 43%; left:  41.0156%;
	
	document.getElementById("card_suit").style.opacity = "1";
	document.getElementById("card_suit").style.setProperty("-webkit-transition", "top 1s ease-out");
	document.getElementById("card_suit").style.setProperty("top", "43%");
	if(time_flag==0){
		time_flag++;
		animate_move_card_suit = setTimeout(move_card_suit,1000);
	}
	else{
		time_flag = 0;
		clearTimeout(animate_move_card_suit);
		move_card_single();


		//SHOW POINT BALLS FOR THE FIRST TIME

		if(player1_present_point==player1_previous_point){

			//audio.play();
			cusion_point_display(player1_present_point,player1_previous_point,1);
			// cusion_point_display(-11,0,1);	
		}

		if(player2_present_point==player2_previous_point){

			//audio.play();
			cusion_point_display(player2_present_point,player2_previous_point,2);
			//cusion_point_display(-11,0,2);	
		}

		if(player3_present_point==player3_previous_point){
			cusion_point_display(player3_present_point,player3_previous_point,3);
			// cusion_point_display(-25,0,3);
		}

		if(player4_present_point==player4_previous_point){
			 cusion_point_display(player4_present_point,player4_previous_point,4);
			//cusion_point_display(-49,0,4);	
		}
	}
	
}

function move_card_single(){
	//This is getting one card out of centered suit
	//STARTING POSITION
	//top: 43%; left:  41.5%;
	//DESIRED POSITION
	//top: 39%; left:  41.5%;

	document.getElementById("card_single").style.opacity = "1";
	move_card_single_top_flag = move_card_single_top_flag - 0.5;
	document.getElementById("card_single").style.top = move_card_single_top_flag + '%';
	if(move_card_single_top_flag<=39){
		clearTimeout(animate_move_card_single);
		move_player_1st_card("player1_card_single");
	}
	else{
		animate_move_card_single = setTimeout(move_card_single,8);
	}
}

function move_player_1st_card(img_id){
	//This is giving all players' first card


	//FOR PLAYER ONE

	//STARTING POSITION
	//top: 39%; left:  41.5%;
	//DESIRED POSITION
	//top: 18%;   left:  24%;

	//FOR PLAYER TWO

	//STARTING POSITION
	//top: 39%; left:  41.5%;
	//DESIRED POSITION
	//top: 18%;  left:  59%;

	//FOR PLAYER THREE

	//STARTING POSITION
	//top: 39%; left:  41.5%;
	//DESIRED POSITION
	//top: 60%;   left:  24%;

	//FOR PLAYER FOUR

	//STARTING POSITION
	//top: 39%; left:  41.5%;
	//DESIRED POSITION
	//top: 60%;  left:  59%;

	if(card_distribute_counter==6){
		document.getElementById("card_suit").style.opacity = "0";
	}
	if(card_distribute_counter==7){
		clearTimeout(animate_move_player_1st_card);
		document.getElementById("card_single").style.opacity = "0";
		player_card_push();
	}
	else{
		document.getElementById(img_id).style.opacity = "1";

		if(img_id==="player1_card_single"){
			if(card_distribute_counter>1){
				document.getElementById("player1_fixed_card").style.opacity = "1";
			}
			move_player_1st_card_top_flag = move_player_1st_card_top_flag - 0.6;
			move_player_1st_card_left_flag = move_player_1st_card_left_flag - 0.5;
		}
		else if(img_id==="player2_card_single"){
			if(card_distribute_counter>1){
				document.getElementById("player2_fixed_card").style.opacity = "1";
			}
			move_player_1st_card_top_flag = move_player_1st_card_top_flag - 0.6 ;
			move_player_1st_card_left_flag = move_player_1st_card_left_flag + 0.5;
		}
		else if(img_id==="player3_card_single"){
			if(card_distribute_counter>1){
				document.getElementById("player3_fixed_card").style.opacity = "1";
			}
			move_player_1st_card_top_flag = move_player_1st_card_top_flag + 0.6;
			move_player_1st_card_left_flag = move_player_1st_card_left_flag - 0.5;
		}
		else if(img_id==="player4_card_single"){
			if(card_distribute_counter>1){
				document.getElementById("player4_fixed_card").style.opacity = "1";
			}
			move_player_1st_card_top_flag = move_player_1st_card_top_flag + 0.6;
			move_player_1st_card_left_flag = move_player_1st_card_left_flag + 0.5;
		}

		document.getElementById(img_id).style.top = move_player_1st_card_top_flag + '%';
		document.getElementById(img_id).style.left = move_player_1st_card_left_flag + '%';
		if(move_player_1st_card_top_flag<=18 && img_id==="player1_card_single"){
			clearTimeout(animate_move_player_1st_card);
			move_player_1st_card_top_flag = 39;
			move_player_1st_card_left_flag = 41.5;
			move_player_1st_card("player2_card_single");
		}
		else if(move_player_1st_card_top_flag<=18 && img_id==="player2_card_single"){
			clearTimeout(animate_move_player_1st_card);
			move_player_1st_card_top_flag = 39;
			move_player_1st_card_left_flag = 41.5;
			move_player_1st_card("player3_card_single");
		}
		else if(move_player_1st_card_top_flag>=60 && img_id==="player3_card_single"){
			clearTimeout(animate_move_player_1st_card);
			move_player_1st_card_top_flag = 39;
			move_player_1st_card_left_flag = 41.5;
			move_player_1st_card("player4_card_single");
		}
		else if(move_player_1st_card_top_flag>=60 && img_id==="player4_card_single"){
			clearTimeout(animate_move_player_1st_card);
			move_player_1st_card_top_flag = 39;
			move_player_1st_card_left_flag = 41.5;
			card_distribute_counter = card_distribute_counter + 1;
			move_player_1st_card("player1_card_single");
		}
		else{
			animate_move_player_1st_card = setTimeout(function(){move_player_1st_card(img_id)},3);
		}
	}

	
}

function player_card_push(){
	//This function will push player 1,2,3,4's own card to them
	document.getElementById("player1_card_single").style.opacity = "0";
	document.getElementById("player2_card_single").style.opacity = "0";
	document.getElementById("player3_card_single").style.opacity = "0";
	document.getElementById("player4_card_single").style.opacity = "0";

	document.getElementById("player1_fixed_card").style.setProperty("-webkit-transition", "left 1s ease-out");
	document.getElementById("player1_fixed_card").style.setProperty("left", "23%");
	document.getElementById("player2_fixed_card").style.setProperty("-webkit-transition", "left 1s ease-out");
	document.getElementById("player2_fixed_card").style.setProperty("left", "60%");
	document.getElementById("player3_fixed_card").style.setProperty("-webkit-transition", "left 1s ease-out");
	document.getElementById("player3_fixed_card").style.setProperty("left", "23%");
	document.getElementById("player4_fixed_card").style.setProperty("-webkit-transition", "left 1s ease-out");
	document.getElementById("player4_fixed_card").style.setProperty("left", "60%");

	
	
	if(ultimate==1){
		document.getElementById("player1_fixed_card").style.setProperty("-webkit-transition", "all 1s ease-out");
		document.getElementById("player1_fixed_card").style.webkitTransform = "scale(0)";
		player_card_display(player1Cards);
	}
	else if(ultimate==2){
		document.getElementById("player2_fixed_card").style.setProperty("-webkit-transition", "all 1s ease-out");
		document.getElementById("player2_fixed_card").style.webkitTransform = "scale(0)";
		player_card_display(player2Cards);
	}
	else if(ultimate==3){
		document.getElementById("player3_fixed_card").style.setProperty("-webkit-transition", "all 1s ease-out");
		document.getElementById("player3_fixed_card").style.webkitTransform = "scale(0)";
		player_card_display(player3Cards);
	}
	else if(ultimate==4){
		document.getElementById("player4_fixed_card").style.setProperty("-webkit-transition", "all 1s ease-out");
		document.getElementById("player4_fixed_card").style.webkitTransform = "scale(0)";
		player_card_display(player4Cards);
	}
	

}

function player_card_display(playerCards){
	//This method will distribute and display player3's card
	//STARTING POSITION OF ALL CARDS OF PLAYER3
	//top: 60%; left:  24%;
	//DESIRED POSTION OF FIRST CARD
	//top: 80%; left:  24.0%;
	//GAP WILL BE 2.5%
	//DESIRED POSITION OF 13TH CARD
	//top: 80%;  left:  57.2%;


	if(time_flag==0){
		time_flag++;
		animate = setTimeout(function(){player_card_display(playerCards)},1500);
	}
	else{
		time_flag = 0;
		clearTimeout(animate);
		call_subwindow();
	}
	var left_flag = 22.6;
	var time_flag2 = 1;
	var zIndex_value = 100;
	for (var i = 0; i < 13; i++) {
		left_flag += 2.6;
		zIndex_value+=i;
		document.getElementById(playerCards[i]).addEventListener("click",function(){player_select_card(this.id);},false);
		document.getElementById(playerCards[i]).addEventListener("mouseover",function(){mouse_over_card(this.id);},false);
		document.getElementById(playerCards[i]).addEventListener("mouseleave",function(){mouse_out_card(this.id);},false);
		document.getElementById(playerCards[i]).style.opacity = "1";
		document.getElementById(playerCards[i]).style.zIndex = zIndex_value;
		document.getElementById(playerCards[i]).style.setProperty("-webkit-transition", "all " + time_flag2 + "s ease-out");
		document.getElementById(playerCards[i]).style.webkitTransform = "rotate(360deg)";
		document.getElementById(playerCards[i]).style.setProperty("top", "80%");
		document.getElementById(playerCards[i]).style.setProperty("left", left_flag+"%");
		time_flag2+=0.03;
		//time_flag2+=1;
	};
	
	
}

function player_select_card(clicked_id){
	//This method will move the selected card to the playfield of player3
	//DESIRED POSTION FOR PLAYER1
	//top: 32%;       left:  34%;
	//DESIRED POSTION FOR PLAYER2
	//top: 32%;       left:  34%;
	//DESIRED POSTION FOR PLAYER3
	//top: 49%;       left:  34%;
	//DESIRED POSTION FOR PLAYER4
	//top: 49%;       left:  50%;


	if(inputFlag==ultimate && clickFlag==0 && nunuFlag==0){

			// amar khela kintu first hand er khela na , board e age thekei kichu card ase
			if(boardCards.length!=0) {
				var clickIndex = clicked_id.toString()[0]-'1';
				var suitIndex = boardCards[0].toString()[0]-'1';

				// jei suit er khela ta amar kache ase kintu ami onno card khelar try kortesi
				if(ultimate==1){
					if((player1Suits[suitIndex].length!=0 && suitIndex!=clickIndex)) {

					}
					// thik moto khellam
					else{
						players_card_rearrange(clicked_id,player1Suits);

						curClick = clicked_id;
						var temp = curClick;
						clickFlag=1;
						cardShowOnBoard(temp,"rotate(-45deg)","33%","34.5%");	

					}
				}
				else if(ultimate==2){
					if((player2Suits[suitIndex].length!=0 && suitIndex!=clickIndex)) {

					}
					// thik moto khellam
					else{
						players_card_rearrange(clicked_id,player2Suits);

						curClick = clicked_id;
						var temp = curClick;
						clickFlag=1;
						cardShowOnBoard(temp,"rotate(45deg)","33%","45.5%");	

					}
				}
				else if(ultimate==3){
					if((player3Suits[suitIndex].length!=0 && suitIndex!=clickIndex)) {

					}
					// thik moto khellam
					else{
						players_card_rearrange(clicked_id,player3Suits);

						curClick = clicked_id;
						var temp = curClick;
						clickFlag=1;
						cardShowOnBoard(temp,"rotate(45deg)","49%","34.5%");	

					}	
				}
				else{
					if((player4Suits[suitIndex].length!=0 && suitIndex!=clickIndex)) {

					}
					// thik moto khellam
					else{
						players_card_rearrange(clicked_id,player4Suits);

						curClick = clicked_id;
						var temp = curClick;
						clickFlag=1;
						cardShowOnBoard(temp,"rotate(-45deg)","49%","45.5%");	

					}
				}
				
			}
			// ami first e khelum
			else{
				var clickIndex = clicked_id.toString()[0]-'1';
				
				if(ultimate==1){
					// amar kache shb e trum tai jeta ichcha sheta khelbo
					if(returnMyCardsWithoutSpade(player1Suits).length==0){
						players_card_rearrange(clicked_id,player1Suits);

						curClick = clicked_id;
						var temp = curClick;
						clickFlag=1;
						cardShowOnBoard(temp,"rotate(-45deg)","33%","34.5%");	

					}
					// amar kache trum + normal card milano
					else{
						// trum break hoi nai kintu trump khelar try kortsi
						if(clickIndex==3 && trumpFlag==0){

						}
						else{
							players_card_rearrange(clicked_id,player1Suits);

							curClick = clicked_id;
							var temp = curClick;
							clickFlag=1;
							cardShowOnBoard(temp,"rotate(-45deg)","33%","34.5%");	

						}

					}
				}
				else if(ultimate==2){
					// amar kache shb e trum tai jeta ichcha sheta khelbo
					if(returnMyCardsWithoutSpade(player2Suits).length==0){
						players_card_rearrange(clicked_id,player2Suits);

						curClick = clicked_id;
						var temp = curClick;
						clickFlag=1;
						cardShowOnBoard(temp,"rotate(45deg)","49%","45.5%");	

					}
					// amar kache trum + normal card milano
					else{
						// trum break hoi nai kintu trump khelar try kortsi
						if(clickIndex==3 && trumpFlag==0){

						}
						else{
							players_card_rearrange(clicked_id,player2Suits);

							curClick = clicked_id;
							var temp = curClick;
							clickFlag=1;
							cardShowOnBoard(temp,"rotate(45deg)","49%","45.5%");	

						}

					}
				}
				else if(ultimate==3){
					// amar kache shb e trum tai jeta ichcha sheta khelbo
					if(returnMyCardsWithoutSpade(player3Suits).length==0){
						players_card_rearrange(clicked_id,player3Suits);

						curClick = clicked_id;
						var temp = curClick;
						clickFlag=1;
						cardShowOnBoard(temp,"rotate(45deg)","49%","34.5%");	

					}
					// amar kache trum + normal card milano
					else{
						// trum break hoi nai kintu trump khelar try kortsi
						if(clickIndex==3 && trumpFlag==0){

						}
						else{
							players_card_rearrange(clicked_id,player3Suits);

							curClick = clicked_id;
							var temp = curClick;
							clickFlag=1;
							cardShowOnBoard(temp,"rotate(45deg)","49%","34.5%");	

						}

					}	
				}
				else{
					// amar kache shb e trum tai jeta ichcha sheta khelbo
					if(returnMyCardsWithoutSpade(player4Suits).length==0){
						players_card_rearrange(clicked_id,player4Suits);

						curClick = clicked_id;
						var temp = curClick;
						clickFlag=1;
						cardShowOnBoard(temp,"rotate(-45deg)","49%","45.5%");	

					}
					// amar kache trum + normal card milano
					else{
						// trum break hoi nai kintu trump khelar try kortsi
						if(clickIndex==3 && trumpFlag==0){

						}
						else{
							players_card_rearrange(clicked_id,player4Suits);

							curClick = clicked_id;
							var temp = curClick;
							clickFlag=1;
							cardShowOnBoard(temp,"rotate(-45deg)","49%","45.5%");	

						}

					}
				}

			}

			//card rearrange
			
			
	}
}



function mouse_over_card(hovered_id){
	//This method will increase the scale to 1.2 of the hovered card of player3
	if(document.getElementById(hovered_id).style.top=="80%" && document.getElementById(hovered_id).style.left>="24%"){
		document.getElementById(hovered_id).style.setProperty("-webkit-transition","all 0.3s ease-out");
		document.getElementById(hovered_id).style.webkitTransform = "scale(1.2)";
	}
	
}

function mouse_out_card(card_id){
	//This method will decrease the scale to 1 of the hovered card of player3
	if(document.getElementById(card_id).style.top=="80%" && document.getElementById(card_id).style.left>="24%"){
		document.getElementById(card_id).style.setProperty("-webkit-transition","all 0.3s ease-out");
		document.getElementById(card_id).style.webkitTransform = "scale(1)";
	}
	
}

function call_subwindow(){
	//These method will prepare the subwindow for the player3 call
	//STARTING POSITION OF FIRST CALL BLOCK
	//top: 35%;       left:  27.8%;



	//background e crad_single r card_suit k soraye dite hobe first e
	document.getElementById("card_suit").style.top = "0%";
	document.getElementById("card_single").style.top = "0%";



	document.getElementById("play_floor").style.setProperty("-webkit-transition", "opacity 1.3s ease");
	document.getElementById("play_floor").style.setProperty("opacity", "0.6");
	document.getElementById("call_background").style.setProperty("-webkit-transition", "opacity 1.3s ease");
	document.getElementById("call_background").style.setProperty("opacity", "0.9");



	//FOR 1ST ROW FROM "NIL" TO "5"
	var left_flag_call = 27.8;
	for (var i = 0; i < 6; i++) {
		document.getElementById(i).style.opacity = "1";
		document.getElementById(i).style.top = "35%";
		document.getElementById(i).style.left = left_flag_call + "%";

		
		left_flag_call+=5.8;
	};

	//FOR 2ND ROW FROM "6" TO "10"
	left_flag_call = 30.7;
	for (var i = 6; i < 11; i++) {
		document.getElementById(i).style.opacity = "1";
		document.getElementById(i).style.left = left_flag_call + "%";
		document.getElementById(i).style.top = "42%";
		left_flag_call+=5.8;
	};

	//FOR 3RD ROW FROM "11" TO "12"
	left_flag_call = 39.5;
	for (var i = 11; i < 13; i++) {
		document.getElementById(i).style.opacity = "1";
		document.getElementById(i).style.left = left_flag_call + "%";
		document.getElementById(i).style.top = "49%";
		left_flag_call+=5.8;
	};

	//FOR 4th ROW "13"
	document.getElementById("13").style.opacity = "1";
	document.getElementById("13").style.left = "42.4%";
	document.getElementById("13").style.top = "56%";




}


// x = document.getElementById(1);
// x.addEventListener('click', function () {
// 	console.log(x);
// 	call_token_selected(1);
// });


function call_token_selected(call_token_id){
	//This method will move and out the selected call token of player3 and save it in player3Call variable
	console.log("I AM OUTSIDE");
	if(game_cycle_start == 0){
		console.log("I AM INSIDE");
		game_cycle_start++;

		document.getElementById("call_background").style.setProperty("-webkit-transition", "opacity 0.5s ease-out");
		document.getElementById("call_background").style.opacity = "0";
		document.getElementById("call_background").style.display = "none";
		document.getElementById("play_floor").style.setProperty("-webkit-transition", "opacity 0.5s ease-out");
		document.getElementById("play_floor").style.opacity = "1";


		for (var i = 0; i < 14; i++) {
			if(call_token_id!=i.toString()){
				// document.getElementById("play_floor").style.setProperty("-webkit-transition", "opacity 0.5s ease-out");
				document.getElementById(i).style.display = "none";
				document.getElementById(i).style.opacity = "0";
			}
			else{

				if(ultimate==1){
					document.getElementById(i).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
					document.getElementById(i).style.setProperty("top", "20%");
					document.getElementById(i).style.setProperty("left", "10%");
					document.getElementById(i).style.webkitTransform = "scale(0)";
					document.getElementById(i).style.opacity = "0";
					player1Call = i;
				}
				else if(ultimate==2){
					document.getElementById(i).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
					document.getElementById(i).style.setProperty("top", "20%");
					document.getElementById(i).style.setProperty("left", "80%");
					document.getElementById(i).style.webkitTransform = "scale(0)";
					document.getElementById(i).style.opacity = "0";
					player2Call = i;
				}
				else if(ultimate==3){
					document.getElementById(i).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
					document.getElementById(i).style.setProperty("top", "75%");
					document.getElementById(i).style.setProperty("left", "10%");
					document.getElementById(i).style.webkitTransform = "scale(0)";
					document.getElementById(i).style.opacity = "0";
					player3Call = i;
				}
				else{
					document.getElementById(i).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
					document.getElementById(i).style.setProperty("top", "75%");
					document.getElementById(i).style.setProperty("left", "80%");
					document.getElementById(i).style.webkitTransform = "scale(0)";
					document.getElementById(i).style.opacity = "0";
					player4Call = i;
				}


				//cusion_point_display(2,-3,3);
			}
		}




		//NOW ALL PLAYER's BALLOONS ARE GOING TO BE DISPLAYED
		showAllPlayerBalloon();




		inputFlag = 1;    //Now player3 can move the cards to the playfield


	}

}








function show_balloon(src, top, left, id, width) {

	//THIS METHOD WILL DISPLAY IMAGE ON PLAY_FLOOR

	if(document.getElementById(id)!==null){
		document.getElementById(id).style.setProperty("top",top+"%");
		document.getElementById(id).style.setProperty("left",left+"%");
		document.getElementById(id).style.setProperty("width",width+"%");
		document.getElementById(id).style.setProperty("height","auto");
		document.getElementById(id).style.opacity = "1";
	}
	else{
	    var img = document.createElement("img");

	    img.src = src;
	    img.id = id;
	    img.style.setProperty("position","absolute");
	    img.style.setProperty("top",top+"%");
	    img.style.setProperty("left",left+"%");
	    img.style.setProperty("width",width+"%");
	    img.style.setProperty("height","auto");
	    //img.style.setProperty("opacity",opacity);


	    // This next line will just add it to the PLAY_SECTION
	    document.getElementById("play_section").appendChild(img);		
	}


}

function vanish_balloon(win_player){
	
	var t=win_player*1000;
	if(win_player==1){
		//remaining_call1++;
		//t+=remaining_call1;
		remaining_call1++;
		if(player1Call-remaining_call1>=0){
			//still within the limit of call
			t+=remaining_call1;
			document.getElementById(t).style.setProperty("opacity","0");
		}
		else{
			//out of call
			if(negetive_call1<7){
				//first row of skull draw
				show_balloon('images/CallDisplay/skull3.png', 44,19-3*negetive_call1,1000+negetive_call1+14,3);	
			}
			else{
				show_balloon('images/CallDisplay/skull3.png', 49,19-3*(negetive_call1-7),1000+negetive_call1+14,3);
			}
			negetive_call1++;
			
		}

	}
	else if(win_player==2){
		//remaining_call2++;
		//t+=remaining_call2;
		remaining_call2++;
		if(player2Call-remaining_call2>=0){
			//still within the limit of call
			t+=remaining_call2;
			document.getElementById(t).style.setProperty("opacity","0");
		}
		else{
			//out of call
			if(negetive_call2<7){
				//first row of skull draw
				show_balloon('images/CallDisplay/skull3.png', 44,90-3*negetive_call2,2000+negetive_call2+14,3);	
			}
			else{
				show_balloon('images/CallDisplay/skull3.png', 49,90-3*(negetive_call2-7),2000+negetive_call2+14,3);
			}
			negetive_call2++;
			
		}

	}
	else if(win_player==3){
		remaining_call3++;
		if(player3Call-remaining_call3>=0){
			//still within the limit of call
			t+=remaining_call3;
			document.getElementById(t).style.setProperty("opacity","0");
		}
		else{
			//out of call
			if(negetive_call3<7){
				//first row of skull draw
				show_balloon('images/CallDisplay/skull3.png', 85,19-3*negetive_call3,3000+negetive_call3+14,3);	
			}
			else{
				show_balloon('images/CallDisplay/skull3.png', 90,19-3*(negetive_call3-7),3000+negetive_call3+14,3);
			}
			negetive_call3++;
			
		}
		
	}
	else if(win_player==4){
		//remaining_call4++;
		//t+=remaining_call4;
		remaining_call4++;
		if(player4Call-remaining_call4>=0){
			//still within the limit of call
			t+=remaining_call4;
			document.getElementById(t).style.setProperty("opacity","0");
		}
		else{
			//out of call
			if(negetive_call4<7){
				//first row of skull draw
				show_balloon('images/CallDisplay/skull3.png', 85,90-3*negetive_call4,4000+negetive_call4+14,3);	
			}
			else{
				show_balloon('images/CallDisplay/skull3.png', 90,90-3*(negetive_call4-7),4000+negetive_call4+14,3);
			}
			negetive_call4++;
			
		}

	}
	
	//document.getElementById(t).style.setProperty("opacity","0");
	
}


function players_card_rearrange(selected_card_id,displaySuits){

	//THIS METHOD WILL REARRANGE PLAYER 3'S CARDS AFTER EACH ROUND OF PLAY


	
	//Now determine how many cards have been played

	var played_cards=0;
	for(var i=0;i<4;i++){
		for(var j=0;j<displaySuits[i].length;j++){
			if(selected_card_id!=displaySuits[i][j].toString()){
				played_cards++;	
			}
			
			
		}
	}

	played_cards=13-played_cards;

	var left_start = 25.2 + (1.3*played_cards);



	
	for(var i=0;i<4;i++){
		for(var j=0;j<displaySuits[i].length;j++){
			if(selected_card_id!=displaySuits[i][j].toString()){
				document.getElementById(displaySuits[i][j]).style.setProperty("-webkit-transition","all .3s ease-out");
				document.getElementById(displaySuits[i][j]).style.setProperty("left", left_start+"%");
				left_start+=2.6;	
			}
		}
	}


}


function cusion_point_display(present_point,previous_point,player_no){
	
	//THIS METHOD WILL DISPLAY POINT ON THE CUSION

	//NB-- NEGETIVE POINT ER KAJ KORA HYNAI



	var first_ball;
	var second_ball;
	var img0 = document.createElement("img");
	var img1 = document.createElement("img");
	var img2 = document.createElement("img");
	var working_string = "0";
	var previous_working_string = "0";



	//PREPARE THE WORKING STRING
	if(Math.abs(present_point).toString().length==1){
		working_string = working_string.concat(Math.abs(present_point).toString());
	}
	else{
		working_string = Math.abs(present_point).toString();
	}


	//PREPARE PREVIOUS_WORKING_STRING
	if(Math.abs(previous_point).toString().length==1){
		previous_working_string = previous_working_string.concat(Math.abs(previous_point).toString());
	}
	else{
		previous_working_string = Math.abs(previous_point).toString();
	}




	if(player_no==1){



		//ID--->FIRST DIGIT  -->1100-1109
		//ID-->SECOND DIGIT  -->1200-1209
		//ID--->MINUS SIGN   -->1110
		




		
		//CHECK IF IT IS THE FIRST TIME OF CUSION_POINT_SHOW
		//first_time_flag3=0 if it is first time

		if(present_point==previous_point){
			//first time,both are zero
			

			//first zero show
			if(document.getElementById("1100")!==null){
				document.getElementById("1100").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1100").style.setProperty("left","11.5%");
				document.getElementById("1100").style.opacity = "1";
				//clearTimeout(cusion_point_display_animate);
			}
			else{
				img1.src = 'images/Point/0.png';
    			img1.id = 1100;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","31%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}
			
    		
    		
    		//second zero show
    		if(document.getElementById("1200")!==null){
    			document.getElementById("1200").style.setProperty("-webkit-transition","all 0.5s ease-out");
				document.getElementById("1200").style.setProperty("top","31%");
				document.getElementById("1200").style.opacity = "1";
				clearTimeout(cusion_point_display_animate);
			}
			else{
				img2.src = 'images/Point/0.png';
    			img2.id = 1200;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","0%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);

    			
			}
 
		}




		//CHECK MINUS SIGN CASE


		//1. IF IT WAS +VE,NOW +VE, DO NOTHING

		//2. IF IT WAS +VE,NOW -VE
		if(previous_point>=0 && present_point<0){

			if(document.getElementById("1110")!==null){
				//age declare kora hoise
				document.getElementById("1110").style.setProperty("-webkit-transition","all 0.6s ease-out");
				document.getElementById("1110").style.opacity="1";
				document.getElementById("1110").style.setProperty("top","31%");
				document.getElementById("1110").style.setProperty("left","9%");
				clearTimeout(cusion_point_display_animate);
			}

			else{
				//age declare kora hynay
				img0.src = 'images/Point/minus2.png';
    			img0.id = 1110;
    			img0.style.setProperty("position","absolute");
    			img0.style.setProperty("top","0%");
    			img0.style.setProperty("left","-5%");
    			img0.style.setProperty("width","2%");
    			img0.style.setProperty("height","auto");

    			document.getElementById("play_section").appendChild(img0);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}
			
		}


		//3. IF IT WAS -VE,NOW +VE
		else if(previous_point<0 && present_point>=0){
			document.getElementById("1110").style.setProperty("-webkit-transition","all 0.3s ease-out");
			document.getElementById("1110").style.opacity="0";
			document.getElementById("1110").style.setProperty("top","0%");
			document.getElementById("1110").style.setProperty("left","-5%");
			
		}


		//4. IF IT WAS -VE,NOW -VE, DO NOTHING





		//NOW CHECK IF PRESENT_POINT AND PREVIOUS_POINT HAS SAME FIRST DIGIT
		//SECOND DIGIT CAN NEVER BE SAME

		if(working_string[0]!==previous_working_string[0]){
			//NOT SAME,YOU HAVE TO REMOVE PREVIOUS BALL OF FIRST DIGIT

			//HIDE PREVIOUS CUSION POINTS
			
				//NOT FIRST TIME ENTRY OF BALLS



			first_ball = 1100 + parseInt(previous_working_string[0]);
			if(document.getElementById(first_ball)!==null){
				document.getElementById(first_ball).style.setProperty("-webkit-transition","all 0.3s ease-out");
				//document.getElementById(first_ball).style.setProperty("top","110%");
				document.getElementById(first_ball).style.setProperty("left","-5%");
				//document.getElementById(first_ball).style.opacity = "0";	
			}
			

		}



		if(first_time_flag1==1){
			//not the first entry in this method
			second_ball = 1200 + parseInt(previous_working_string[1]);
			if(document.getElementById(second_ball)!==null){
				document.getElementById(second_ball).style.setProperty("-webkit-transition","all 0.4s ease-out");
				document.getElementById(second_ball).style.setProperty("top","0%");
				//document.getElementById(second_ball).style.setProperty("left","-5%");
				document.getElementById(second_ball).style.opacity = "0";	
				//audio.play();
			}
			
			
		}


			




		//FOR FIRST DIGIT


		if(working_string[0]=='0'){
			if(document.getElementById("1100")!==null){
				//age declare kora hoise
				
				document.getElementById("1100").style.opacity="1";
				document.getElementById("1100").style.setProperty("-webkit-transition","all 0.3s ease-out");
				//document.getElementById("1110").style.opacity="1";
				document.getElementById("1100").style.setProperty("top","31%");
				document.getElementById("1100").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/0.png';
    			img1.id = 1100;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","31%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}
		}

		
		else if(working_string[0]=='1'){

			if(document.getElementById("1101")!==null){
				//age declare kora hoise
				document.getElementById("1101").style.opacity="1";
				document.getElementById("1101").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1101").style.setProperty("top","31%");
				document.getElementById("1101").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/1.png';
    			img1.id = 1101;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","31%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}


    			
		}
			


		else if(working_string[0]=='2'){

			if(document.getElementById("1102")!==null){
				//age declare kora hoise
				document.getElementById("1102").style.opacity="1";
				document.getElementById("1102").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1102").style.setProperty("top","31%");
				document.getElementById("1102").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/2.png';
    			img1.id = 1102;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","31%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}
				

		}
		

		else if(working_string[0]=='3'){
			if(document.getElementById("1103")!==null){
				//age declare kora hoise
				document.getElementById("1103").style.opacity="1";
				document.getElementById("1103").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1103").style.setProperty("top","31%");
				document.getElementById("1103").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/3.png';
    			img1.id = 1103;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","31%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}
		

		else if(working_string[0]=='4'){
			if(document.getElementById("1104")!==null){
				//age declare kora hoise
				document.getElementById("1104").style.opacity="1";
				document.getElementById("1104").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1104").style.setProperty("top","31%");
				document.getElementById("1104").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/4.png';
    			img1.id = 1104;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","31%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}
		

		else if(working_string[0]=='5'){
			if(document.getElementById("1105")!==null){
				//age declare kora hoise
				document.getElementById("1105").style.opacity="1";
				document.getElementById("1105").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1105").style.setProperty("top","31%");
				document.getElementById("1105").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/5.png';
    			img1.id = 1105;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","31%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}


		else if(working_string[0]=='6'){
			if(document.getElementById("1106")!==null){
				//age declare kora hoise
				document.getElementById("1106").style.opacity="1";
				document.getElementById("1106").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1106").style.setProperty("top","31%");
				document.getElementById("1106").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/6.png';
    			img1.id = 1106;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","31%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}
		

		else if(working_string[0]=='7'){
			if(document.getElementById("1107")!==null){
				//age declare kora hoise
				document.getElementById("1107").style.opacity="1";
				document.getElementById("1107").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1107").style.setProperty("top","31%");
				document.getElementById("1107").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/7.png';
    			img1.id = 1107;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","31%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);			}

		}


		else if(working_string[0]=='8'){
			if(document.getElementById("1108")!==null){
				//age declare kora hoise
				document.getElementById("1108").style.opacity="1";
				document.getElementById("1108").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1108").style.setProperty("top","31%");
				document.getElementById("1108").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/8.png';
    			img1.id = 1108;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","31%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}


		else if(working_string[0]=='9'){
			if(document.getElementById("1109")!==null){
				//age declare kora hoise
				document.getElementById("1109").style.opacity="1";
				document.getElementById("1109").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1109").style.setProperty("top","31%");
				document.getElementById("1109").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/9.png';
    			img1.id = 1109;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","31%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}


		


		

		//FOR 2ND DIGIT

			
		


		if(working_string[1]=='0'){
			if(document.getElementById("1200")!==null){
				//age declare kora hoise
				document.getElementById("1200").style.opacity="1";
				document.getElementById("1200").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1200").style.setProperty("top","31%");
				document.getElementById("1200").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/0.png';
    			img2.id = 1200;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","0%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
			

		else if(working_string[1]=='1'){
			if(document.getElementById("1201")!==null){
				//age declare kora hoise
				document.getElementById("1201").style.opacity="1";
				document.getElementById("1201").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1201").style.setProperty("top","31%");
				document.getElementById("1201").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/1.png';
    			img2.id = 1201;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","0%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='2'){
			if(document.getElementById("1202")!==null){
				//age declare kora hoise
				document.getElementById("1202").style.opacity="1";
				document.getElementById("1202").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1202").style.setProperty("top","31%");
				document.getElementById("1202").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/2.png';
    			img2.id = 1202;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","0%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='3'){
			if(document.getElementById("1203")!==null){
				//age declare kora hoise
				document.getElementById("1203").style.opacity="1";
				document.getElementById("1203").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1203").style.setProperty("top","31%");
				document.getElementById("1203").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/3.png';
    			img2.id = 1203;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","0%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='4'){
			if(document.getElementById("1204")!==null){
				//age declare kora hoise
				document.getElementById("1204").style.opacity="1";
				document.getElementById("1204").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1204").style.setProperty("top","31%");
				document.getElementById("1204").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/4.png';
    			img2.id = 1204;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","0%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='5'){
			if(document.getElementById("1205")!==null){
				//age declare kora hoise
				document.getElementById("1205").style.opacity="1";
				document.getElementById("1205").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1205").style.setProperty("top","31%");
				document.getElementById("1205").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/5.png';
    			img2.id = 1205;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","0%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='6'){
			if(document.getElementById("1206")!==null){
				//age declare kora hoise
				document.getElementById("1206").style.opacity="1";
				document.getElementById("1206").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1206").style.setProperty("top","31%");
				document.getElementById("1206").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/6.png';
    			img2.id = 1206;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","0%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='7'){
			if(document.getElementById("1207")!==null){
				//age declare kora hoise
				document.getElementById("1207").style.opacity="1";
				document.getElementById("1207").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1207").style.setProperty("top","31%");
				document.getElementById("1207").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/7.png';
    			img2.id = 1207;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","0%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='8'){
			if(document.getElementById("1208")!==null){
				//age declare kora hoise
				document.getElementById("1208").style.opacity="1";
				document.getElementById("1208").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1208").style.setProperty("top","31%");
				document.getElementById("1208").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/8.png';
    			img2.id = 1208;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","0%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='9'){
			if(document.getElementById("1209")!==null){
				//age declare kora hoise
				document.getElementById("1209").style.opacity="1";
				document.getElementById("1209").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("1209").style.setProperty("top","31%");
				document.getElementById("1209").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/9.png';
    			img2.id = 1209;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","0%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}

		

		
		if(first_time_flag1==0){
			first_time_flag1 = 1;

		}

	}
	else if(player_no==2){


		//ID--->FIRST DIGIT  -->2100-2109
		//ID-->SECOND DIGIT  -->2200-2209
		//ID--->MINUS SIGN   -->2110
		






		

		//CHECK IF IT IS THE FIRST TIME OF CUSION_POINT_SHOW
		//first_time_flag4=0 if it is first time



		if(present_point==previous_point){
			//first time,both are zero
			


			//first zero show
			if(document.getElementById("2100")!==null){

				document.getElementById("2100").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2100").style.setProperty("top","31%");
				document.getElementById("2100").style.opacity = "1";
				//clearTimeout(cusion_point_display_animate);
			}
			else{

				img1.src = 'images/Point/0.png';
    			img1.id = 2100;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","0%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
				
			}
			
    		
    		
    		//second zero show
    		if(document.getElementById("2200")!==null){
    			document.getElementById("2200").style.setProperty("-webkit-transition","all 0.5s ease-out");
				document.getElementById("2200").style.setProperty("left","76%");
				document.getElementById("2200").style.opacity = "1";
				clearTimeout(cusion_point_display_animate);
			}
			else{
				img2.src = 'images/Point/0.png';
    			img2.id = 2200;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","31%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);

    			
			}
 
		}


		

		//CHECK MINUS SIGN CASE


		//1. IF IT WAS +VE,NOW +VE, DO NOTHING

		//2. IF IT WAS +VE,NOW -VE
		if(previous_point>=0 && present_point<0){

			if(document.getElementById("2110")!==null){
				//age declare kora hoise
				document.getElementById("2110").style.setProperty("-webkit-transition","all 0.6s ease-out");
				document.getElementById("2110").style.opacity="1";
				document.getElementById("2110").style.setProperty("top","31%");
				document.getElementById("2110").style.setProperty("left","71.5%");
				clearTimeout(cusion_point_display_animate);
			}

			else{
				//age declare kora hynay
				img0.src = 'images/Point/minus2.png';
    			img0.id = 2110;
    			img0.style.setProperty("position","absolute");
    			img0.style.setProperty("top","0%");
    			img0.style.setProperty("left","105%");
    			img0.style.setProperty("width","2%");
    			img0.style.setProperty("height","auto");

    			document.getElementById("play_section").appendChild(img0);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}
			
		}



		//3. IF IT WAS -VE,NOW +VE
		else if(previous_point<0 && present_point>=0){
			document.getElementById("2110").style.setProperty("-webkit-transition","all 0.3s ease-out");
			document.getElementById("2110").style.opacity="0";
			document.getElementById("2110").style.setProperty("top","0%");
			document.getElementById("2110").style.setProperty("left","105%");
			
		}


		//4. IF IT WAS -VE,NOW -VE, DO NOTHING



		

		//NOW CHECK IF PRESENT_POINT AND PREVIOUS_POINT HAS SAME FIRST DIGIT
		//SECOND DIGIT CAN NEVER BE SAME

		if(working_string[0]!==previous_working_string[0]){
			//NOT SAME,YOU HAVE TO REMOVE PREVIOUS BALL OF FIRST DIGIT

			//HIDE PREVIOUS CUSION POINTS
			
				//NOT FIRST TIME ENTRY OF BALLS

			first_ball = 2100 + parseInt(previous_working_string[0]);
			if(document.getElementById(first_ball)!==null){
				document.getElementById(first_ball).style.setProperty("-webkit-transition","all 0.3s ease-out");
				//document.getElementById(first_ball).style.setProperty("top","110%");
				document.getElementById(first_ball).style.setProperty("left","105%");
				//document.getElementById(first_ball).style.opacity = "0";	
			}
			

		}



		if(first_time_flag2==1){
			//not the first entry in this method
			second_ball = 2200 + parseInt(previous_working_string[1]);
			if(document.getElementById(second_ball)!==null){
				document.getElementById(second_ball).style.setProperty("-webkit-transition","all 0.4s ease-out");
				document.getElementById(second_ball).style.setProperty("top","0%");
				//document.getElementById(second_ball).style.setProperty("left","-5%");
				document.getElementById(second_ball).style.opacity = "0";	
			}
			
		}


			




		//FOR FIRST DIGIT


		if(working_string[0]=='0'){
			if(document.getElementById("2100")!==null){
				//age declare kora hoise
				
				document.getElementById("2100").style.opacity="1";
				document.getElementById("2100").style.setProperty("-webkit-transition","all 0.3s ease-out");
				//document.getElementById("2110").style.opacity="1";
				document.getElementById("2100").style.setProperty("top","31%");
				document.getElementById("2100").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/0.png';
    			img1.id = 2100;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","0%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}
		}

		
		else if(working_string[0]=='1'){

			if(document.getElementById("2101")!==null){
				//age declare kora hoise
				document.getElementById("2101").style.opacity="1";
				document.getElementById("2101").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2101").style.setProperty("top","31%");
				document.getElementById("2101").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/1.png';
    			img1.id = 2101;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","0%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}


    			
		}
			


		else if(working_string[0]=='2'){

			if(document.getElementById("2102")!==null){
				//age declare kora hoise
				document.getElementById("2102").style.opacity="1";
				document.getElementById("2102").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2102").style.setProperty("top","31%");
				document.getElementById("2102").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/2.png';
    			img1.id = 2102;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","0%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}
				

		}
		

		else if(working_string[0]=='3'){
			if(document.getElementById("2103")!==null){
				//age declare kora hoise
				document.getElementById("2103").style.opacity="1";
				document.getElementById("2103").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2103").style.setProperty("top","31%");
				document.getElementById("2103").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/3.png';
    			img1.id = 2103;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","0%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}
		

		else if(working_string[0]=='4'){
			if(document.getElementById("2104")!==null){
				//age declare kora hoise
				document.getElementById("2104").style.opacity="1";
				document.getElementById("2104").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2104").style.setProperty("top","31%");
				document.getElementById("2104").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/4.png';
    			img1.id = 2104;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","0%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}
		

		else if(working_string[0]=='5'){
			if(document.getElementById("2105")!==null){
				//age declare kora hoise
				document.getElementById("2105").style.opacity="1";
				document.getElementById("2105").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2105").style.setProperty("top","31%");
				document.getElementById("2105").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/5.png';
    			img1.id = 2105;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","0%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}


		else if(working_string[0]=='6'){
			if(document.getElementById("2106")!==null){
				//age declare kora hoise
				document.getElementById("2106").style.opacity="1";
				document.getElementById("2106").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2106").style.setProperty("top","31%");
				document.getElementById("2106").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/6.png';
    			img1.id = 2106;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","0%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}
		

		else if(working_string[0]=='7'){
			if(document.getElementById("2107")!==null){
				//age declare kora hoise
				document.getElementById("2107").style.opacity="1";
				document.getElementById("2107").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2107").style.setProperty("top","31%");
				document.getElementById("2107").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/7.png';
    			img1.id = 2107;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","0%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);			}

		}


		else if(working_string[0]=='8'){
			if(document.getElementById("2108")!==null){
				//age declare kora hoise
				document.getElementById("2108").style.opacity="1";
				document.getElementById("2108").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2108").style.setProperty("top","31%");
				document.getElementById("2108").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/8.png';
    			img1.id = 2108;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","0%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}


		else if(working_string[0]=='9'){
			if(document.getElementById("2109")!==null){
				//age declare kora hoise
				document.getElementById("2109").style.opacity="1";
				document.getElementById("2109").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2109").style.setProperty("top","31%");
				document.getElementById("2109").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/9.png';
    			img1.id = 2109;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","0%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}


		


		

		//FOR 2ND DIGIT

			
		


		if(working_string[1]=='0'){
			if(document.getElementById("2200")!==null){
				//age declare kora hoise
				document.getElementById("2200").style.opacity="1";
				document.getElementById("2200").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2200").style.setProperty("top","31%");
				document.getElementById("2200").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/0.png';
    			img2.id = 2200;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","31%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
			

		else if(working_string[1]=='1'){
			if(document.getElementById("2201")!==null){
				//age declare kora hoise
				document.getElementById("2201").style.opacity="1";
				document.getElementById("2201").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2201").style.setProperty("top","31%");
				document.getElementById("2201").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/1.png';
    			img2.id = 2201;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","31%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='2'){
			if(document.getElementById("2202")!==null){
				//age declare kora hoise
				document.getElementById("2202").style.opacity="1";
				document.getElementById("2202").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2202").style.setProperty("top","31%");
				document.getElementById("2202").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/2.png';
    			img2.id = 2202;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","31%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='3'){
			if(document.getElementById("2203")!==null){
				//age declare kora hoise
				document.getElementById("2203").style.opacity="1";
				document.getElementById("2203").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2203").style.setProperty("top","31%");
				document.getElementById("2203").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/3.png';
    			img2.id = 2203;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","31%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='4'){
			if(document.getElementById("2204")!==null){
				//age declare kora hoise
				document.getElementById("2204").style.opacity="1";
				document.getElementById("2204").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2204").style.setProperty("top","31%");
				document.getElementById("2204").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/4.png';
    			img2.id = 2204;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","31%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='5'){
			if(document.getElementById("2205")!==null){
				//age declare kora hoise
				document.getElementById("2205").style.opacity="1";
				document.getElementById("2205").style.setProperty("-webkit76nsition","all 0.3s ease-out");
				document.getElementById("2205").style.setProperty("top","31%");
				document.getElementById("2205").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/5.png';
    			img2.id = 2205;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","31%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='6'){
			if(document.getElementById("2206")!==null){
				//age declare kora hoise
				document.getElementById("2206").style.opacity="1";
				document.getElementById("2206").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2206").style.setProperty("top","31%");
				document.getElementById("2206").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/6.png';
    			img2.id = 2206;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","31%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='7'){
			if(document.getElementById("2207")!==null){
				//age declare kora hoise
				document.getElementById("2207").style.opacity="1";
				document.getElementById("2207").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2207").style.setProperty("top","31%");
				document.getElementById("2207").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/7.png';
    			img2.id = 2207;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","31%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='8'){
			if(document.getElementById("2208")!==null){
				//age declare kora hoise
				document.getElementById("2208").style.opacity="1";
				document.getElementById("2208").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2208").style.setProperty("top","31%");
				document.getElementById("2208").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/8.png';
    			img2.id = 2208;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","31%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='9'){
			if(document.getElementById("2209")!==null){
				//age declare kora hoise
				document.getElementById("2209").style.opacity="1";
				document.getElementById("2209").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("2209").style.setProperty("top","31%");
				document.getElementById("2209").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/9.png';
    			img2.id = 2209;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","31%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}

		

		
		if(first_time_flag2==0){
			first_time_flag2 = 1;
		}	


	}
	else if(player_no==3){


		//ID--->FIRST DIGIT  -->3100-3109
		//ID-->SECOND DIGIT  -->3200-3209
		//ID--->MINUS SIGN   -->3110
		




		
		//CHECK IF IT IS THE FIRST TIME OF CUSION_POINT_SHOW
		//first_time_flag3=0 if it is first time

		if(present_point==previous_point){
			//first time,both are zero
			

			//first zero show
			if(document.getElementById("3100")!==null){
				document.getElementById("3100").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3100").style.setProperty("left","11.5%");
				document.getElementById("3100").style.opacity = "1";
				//clearTimeout(cusion_point_display_animate);
			}
			else{
				img1.src = 'images/Point/0.png';
    			img1.id = 3100;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","71%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}
			
    		
    		
    		//second zero show
    		if(document.getElementById("3200")!==null){
    			document.getElementById("3200").style.setProperty("-webkit-transition","all 0.5s ease-out");
				document.getElementById("3200").style.setProperty("top","71%");
				document.getElementById("3200").style.opacity = "1";
				clearTimeout(cusion_point_display_animate);
			}
			else{
				img2.src = 'images/Point/0.png';
    			img2.id = 3200;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","110%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);

    			
			}
 
		}




		//CHECK MINUS SIGN CASE


		//1. IF IT WAS +VE,NOW +VE, DO NOTHING

		//2. IF IT WAS +VE,NOW -VE
		if(previous_point>=0 && present_point<0){

			if(document.getElementById("3110")!==null){
				//age declare kora hoise
				document.getElementById("3110").style.setProperty("-webkit-transition","all 0.6s ease-out");
				document.getElementById("3110").style.opacity="1";
				document.getElementById("3110").style.setProperty("top","71%");
				document.getElementById("3110").style.setProperty("left","9%");
				clearTimeout(cusion_point_display_animate);
			}

			else{
				//age declare kora hynay
				img0.src = 'images/Point/minus2.png';
    			img0.id = 3110;
    			img0.style.setProperty("position","absolute");
    			img0.style.setProperty("top","110%");
    			img0.style.setProperty("left","-5%");
    			img0.style.setProperty("width","2%");
    			img0.style.setProperty("height","auto");

    			document.getElementById("play_section").appendChild(img0);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}
			
		}


		//3. IF IT WAS -VE,NOW +VE
		else if(previous_point<0 && present_point>=0){
			document.getElementById("3110").style.setProperty("-webkit-transition","all 0.3s ease-out");
			document.getElementById("3110").style.opacity="0";
			document.getElementById("3110").style.setProperty("top","100%");
			document.getElementById("3110").style.setProperty("left","-5%");
			
		}


		//4. IF IT WAS -VE,NOW -VE, DO NOTHING





		//NOW CHECK IF PRESENT_POINT AND PREVIOUS_POINT HAS SAME FIRST DIGIT
		//SECOND DIGIT CAN NEVER BE SAME

		if(working_string[0]!==previous_working_string[0]){
			//NOT SAME,YOU HAVE TO REMOVE PREVIOUS BALL OF FIRST DIGIT

			//HIDE PREVIOUS CUSION POINTS
			
				//NOT FIRST TIME ENTRY OF BALLS



			first_ball = 3100 + parseInt(previous_working_string[0]);
			if(document.getElementById(first_ball)!==null){
				document.getElementById(first_ball).style.setProperty("-webkit-transition","all 0.3s ease-out");
				//document.getElementById(first_ball).style.setProperty("top","110%");
				document.getElementById(first_ball).style.setProperty("left","-5%");
				//document.getElementById(first_ball).style.opacity = "0";	
			}
			

		}



		if(first_time_flag3==1){
			//not the first entry in this method
			second_ball = 3200 + parseInt(previous_working_string[1]);
			if(document.getElementById(second_ball)!==null){
				document.getElementById(second_ball).style.setProperty("-webkit-transition","all 0.4s ease-out");
				document.getElementById(second_ball).style.setProperty("top","100%");
				//document.getElementById(second_ball).style.setProperty("left","-5%");
				document.getElementById(second_ball).style.opacity = "0";	
				//audio.play();
			}
			
			
		}


			




		//FOR FIRST DIGIT


		if(working_string[0]=='0'){
			if(document.getElementById("3100")!==null){
				//age declare kora hoise
				
				document.getElementById("3100").style.opacity="1";
				document.getElementById("3100").style.setProperty("-webkit-transition","all 0.3s ease-out");
				//document.getElementById("3110").style.opacity="1";
				document.getElementById("3100").style.setProperty("top","71%");
				document.getElementById("3100").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/0.png';
    			img1.id = 3100;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","71%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}
		}

		
		else if(working_string[0]=='1'){

			if(document.getElementById("3101")!==null){
				//age declare kora hoise
				document.getElementById("3101").style.opacity="1";
				document.getElementById("3101").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3101").style.setProperty("top","71%");
				document.getElementById("3101").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/1.png';
    			img1.id = 3101;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","71%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}


    			
		}
			


		else if(working_string[0]=='2'){

			if(document.getElementById("3102")!==null){
				//age declare kora hoise
				document.getElementById("3102").style.opacity="1";
				document.getElementById("3102").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3102").style.setProperty("top","71%");
				document.getElementById("3102").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/2.png';
    			img1.id = 3102;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","71%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}
				

		}
		

		else if(working_string[0]=='3'){
			if(document.getElementById("3103")!==null){
				//age declare kora hoise
				document.getElementById("3103").style.opacity="1";
				document.getElementById("3103").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3103").style.setProperty("top","71%");
				document.getElementById("3103").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/3.png';
    			img1.id = 3103;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","71%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}
		

		else if(working_string[0]=='4'){
			if(document.getElementById("3104")!==null){
				//age declare kora hoise
				document.getElementById("3104").style.opacity="1";
				document.getElementById("3104").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3104").style.setProperty("top","71%");
				document.getElementById("3104").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/4.png';
    			img1.id = 3104;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","71%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}
		

		else if(working_string[0]=='5'){
			if(document.getElementById("3105")!==null){
				//age declare kora hoise
				document.getElementById("3105").style.opacity="1";
				document.getElementById("3105").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3105").style.setProperty("top","71%");
				document.getElementById("3105").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/5.png';
    			img1.id = 3105;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","71%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}


		else if(working_string[0]=='6'){
			if(document.getElementById("3106")!==null){
				//age declare kora hoise
				document.getElementById("3106").style.opacity="1";
				document.getElementById("3106").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3106").style.setProperty("top","71%");
				document.getElementById("3106").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/6.png';
    			img1.id = 3106;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","71%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}
		

		else if(working_string[0]=='7'){
			if(document.getElementById("3107")!==null){
				//age declare kora hoise
				document.getElementById("3107").style.opacity="1";
				document.getElementById("3107").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3107").style.setProperty("top","71%");
				document.getElementById("3107").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/7.png';
    			img1.id = 3107;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","71%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);			}

		}


		else if(working_string[0]=='8'){
			if(document.getElementById("3108")!==null){
				//age declare kora hoise
				document.getElementById("3108").style.opacity="1";
				document.getElementById("3108").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3108").style.setProperty("top","71%");
				document.getElementById("3108").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/8.png';
    			img1.id = 3108;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","71%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}


		else if(working_string[0]=='9'){
			if(document.getElementById("3109")!==null){
				//age declare kora hoise
				document.getElementById("3109").style.opacity="1";
				document.getElementById("3109").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3109").style.setProperty("top","71%");
				document.getElementById("3109").style.setProperty("left","11.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/9.png';
    			img1.id = 3109;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","71%");
    			img1.style.setProperty("left","-5%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}


		


		

		//FOR 2ND DIGIT

			
		


		if(working_string[1]=='0'){
			if(document.getElementById("3200")!==null){
				//age declare kora hoise
				document.getElementById("3200").style.opacity="1";
				document.getElementById("3200").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3200").style.setProperty("top","71%");
				document.getElementById("3200").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/0.png';
    			img2.id = 3200;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","110%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
			

		else if(working_string[1]=='1'){
			if(document.getElementById("3201")!==null){
				//age declare kora hoise
				document.getElementById("3201").style.opacity="1";
				document.getElementById("3201").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3201").style.setProperty("top","71%");
				document.getElementById("3201").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/1.png';
    			img2.id = 3201;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","110%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='2'){
			if(document.getElementById("3202")!==null){
				//age declare kora hoise
				document.getElementById("3202").style.opacity="1";
				document.getElementById("3202").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3202").style.setProperty("top","71%");
				document.getElementById("3202").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/2.png';
    			img2.id = 3202;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","110%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='3'){
			if(document.getElementById("3203")!==null){
				//age declare kora hoise
				document.getElementById("3203").style.opacity="1";
				document.getElementById("3203").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3203").style.setProperty("top","71%");
				document.getElementById("3203").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/3.png';
    			img2.id = 3203;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","110%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='4'){
			if(document.getElementById("3204")!==null){
				//age declare kora hoise
				document.getElementById("3204").style.opacity="1";
				document.getElementById("3204").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3204").style.setProperty("top","71%");
				document.getElementById("3204").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/4.png';
    			img2.id = 3204;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","110%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='5'){
			if(document.getElementById("3205")!==null){
				//age declare kora hoise
				document.getElementById("3205").style.opacity="1";
				document.getElementById("3205").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3205").style.setProperty("top","71%");
				document.getElementById("3205").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/5.png';
    			img2.id = 3205;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","110%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='6'){
			if(document.getElementById("3206")!==null){
				//age declare kora hoise
				document.getElementById("3206").style.opacity="1";
				document.getElementById("3206").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3206").style.setProperty("top","71%");
				document.getElementById("3206").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/6.png';
    			img2.id = 3206;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","110%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='7'){
			if(document.getElementById("3207")!==null){
				//age declare kora hoise
				document.getElementById("3207").style.opacity="1";
				document.getElementById("3207").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3207").style.setProperty("top","71%");
				document.getElementById("3207").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/7.png';
    			img2.id = 3207;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","110%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='8'){
			if(document.getElementById("3208")!==null){
				//age declare kora hoise
				document.getElementById("3208").style.opacity="1";
				document.getElementById("3208").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3208").style.setProperty("top","71%");
				document.getElementById("3208").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/8.png';
    			img2.id = 3208;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","110%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='9'){
			if(document.getElementById("3209")!==null){
				//age declare kora hoise
				document.getElementById("3209").style.opacity="1";
				document.getElementById("3209").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("3209").style.setProperty("top","71%");
				document.getElementById("3209").style.setProperty("left","13.5%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/9.png';
    			img2.id = 3209;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","110%");
    			img2.style.setProperty("left","13.5%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}

		

		
		if(first_time_flag3==0){
			first_time_flag3 = 1;

		}

	}	
		
	






	else if(player_no==4){


		//ID--->FIRST DIGIT  -->4100-4109
		//ID-->SECOND DIGIT  -->4200-4209
		//ID--->MINUS SIGN   -->4110
		






		

		//CHECK IF IT IS THE FIRST TIME OF CUSION_POINT_SHOW
		//first_time_flag4=0 if it is first time



		if(present_point==previous_point){
			//first time,both are zero
			


			//first zero show
			if(document.getElementById("4100")!==null){

				document.getElementById("4100").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4100").style.setProperty("top","71%");
				document.getElementById("4100").style.opacity = "1";
				//clearTimeout(cusion_point_display_animate);
			}
			else{

				img1.src = 'images/Point/0.png';
    			img1.id = 4100;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","110%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
				
			}
			
    		
    		
    		//second zero show
    		if(document.getElementById("4200")!==null){
    			document.getElementById("4200").style.setProperty("-webkit-transition","all 0.5s ease-out");
				document.getElementById("4200").style.setProperty("left","76%");
				document.getElementById("4200").style.opacity = "1";
				clearTimeout(cusion_point_display_animate);
			}
			else{
				img2.src = 'images/Point/0.png';
    			img2.id = 4200;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","71%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);

    			
			}
 
		}


		

		//CHECK MINUS SIGN CASE


		//1. IF IT WAS +VE,NOW +VE, DO NOTHING

		//2. IF IT WAS +VE,NOW -VE
		if(previous_point>=0 && present_point<0){

			if(document.getElementById("4110")!==null){
				//age declare kora hoise
				document.getElementById("4110").style.setProperty("-webkit-transition","all 0.6s ease-out");
				document.getElementById("4110").style.opacity="1";
				document.getElementById("4110").style.setProperty("top","71%");
				document.getElementById("4110").style.setProperty("left","71.5%");
				clearTimeout(cusion_point_display_animate);
			}

			else{
				//age declare kora hynay
				img0.src = 'images/Point/minus2.png';
    			img0.id = 4110;
    			img0.style.setProperty("position","absolute");
    			img0.style.setProperty("top","110%");
    			img0.style.setProperty("left","105%");
    			img0.style.setProperty("width","2%");
    			img0.style.setProperty("height","auto");

    			document.getElementById("play_section").appendChild(img0);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}
			
		}



		//3. IF IT WAS -VE,NOW +VE
		else if(previous_point<0 && present_point>=0){
			document.getElementById("4110").style.setProperty("-webkit-transition","all 0.3s ease-out");
			document.getElementById("4110").style.opacity="0";
			document.getElementById("4110").style.setProperty("top","100%");
			document.getElementById("4110").style.setProperty("left","105%");
			
		}


		//4. IF IT WAS -VE,NOW -VE, DO NOTHING



		

		//NOW CHECK IF PRESENT_POINT AND PREVIOUS_POINT HAS SAME FIRST DIGIT
		//SECOND DIGIT CAN NEVER BE SAME

		if(working_string[0]!==previous_working_string[0]){
			//NOT SAME,YOU HAVE TO REMOVE PREVIOUS BALL OF FIRST DIGIT

			//HIDE PREVIOUS CUSION POINTS
			
				//NOT FIRST TIME ENTRY OF BALLS

			first_ball = 4100 + parseInt(previous_working_string[0]);
			if(document.getElementById(first_ball)!==null){
				document.getElementById(first_ball).style.setProperty("-webkit-transition","all 0.3s ease-out");
				//document.getElementById(first_ball).style.setProperty("top","110%");
				document.getElementById(first_ball).style.setProperty("left","-5%");
				//document.getElementById(first_ball).style.opacity = "0";	
			}
			

		}



		if(first_time_flag4==1){
			//not the first entry in this method
			second_ball = 4200 + parseInt(previous_working_string[1]);
			if(document.getElementById(second_ball)!==null){
				document.getElementById(second_ball).style.setProperty("-webkit-transition","all 0.4s ease-out");
				document.getElementById(second_ball).style.setProperty("top","100%");
				//document.getElementById(second_ball).style.setProperty("left","-5%");
				document.getElementById(second_ball).style.opacity = "0";	
			}
			
		}


			




		//FOR FIRST DIGIT


		if(working_string[0]=='0'){
			if(document.getElementById("4100")!==null){
				//age declare kora hoise
				
				document.getElementById("4100").style.opacity="1";
				document.getElementById("4100").style.setProperty("-webkit-transition","all 0.3s ease-out");
				//document.getElementById("4110").style.opacity="1";
				document.getElementById("4100").style.setProperty("top","71%");
				document.getElementById("4100").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/0.png';
    			img1.id = 4100;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","110%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}
		}

		
		else if(working_string[0]=='1'){

			if(document.getElementById("4101")!==null){
				//age declare kora hoise
				document.getElementById("4101").style.opacity="1";
				document.getElementById("4101").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4101").style.setProperty("top","71%");
				document.getElementById("4101").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/1.png';
    			img1.id = 4101;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","110%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}


    			
		}
			


		else if(working_string[0]=='2'){

			if(document.getElementById("4102")!==null){
				//age declare kora hoise
				document.getElementById("4102").style.opacity="1";
				document.getElementById("4102").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4102").style.setProperty("top","71%");
				document.getElementById("4102").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/2.png';
    			img1.id = 4102;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","110%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}
				

		}
		

		else if(working_string[0]=='3'){
			if(document.getElementById("4103")!==null){
				//age declare kora hoise
				document.getElementById("4103").style.opacity="1";
				document.getElementById("4103").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4103").style.setProperty("top","71%");
				document.getElementById("4103").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/3.png';
    			img1.id = 4103;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","110%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}
		

		else if(working_string[0]=='4'){
			if(document.getElementById("4104")!==null){
				//age declare kora hoise
				document.getElementById("4104").style.opacity="1";
				document.getElementById("4104").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4104").style.setProperty("top","71%");
				document.getElementById("4104").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/4.png';
    			img1.id = 4104;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","110%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}
		

		else if(working_string[0]=='5'){
			if(document.getElementById("4105")!==null){
				//age declare kora hoise
				document.getElementById("4105").style.opacity="1";
				document.getElementById("4105").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4105").style.setProperty("top","71%");
				document.getElementById("4105").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/5.png';
    			img1.id = 4105;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","110%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}


		else if(working_string[0]=='6'){
			if(document.getElementById("4106")!==null){
				//age declare kora hoise
				document.getElementById("4106").style.opacity="1";
				document.getElementById("4106").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4106").style.setProperty("top","71%");
				document.getElementById("4106").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/6.png';
    			img1.id = 4106;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","110%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}
		

		else if(working_string[0]=='7'){
			if(document.getElementById("4107")!==null){
				//age declare kora hoise
				document.getElementById("4107").style.opacity="1";
				document.getElementById("4107").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4107").style.setProperty("top","71%");
				document.getElementById("4107").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/7.png';
    			img1.id = 4107;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","110%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);			}

		}


		else if(working_string[0]=='8'){
			if(document.getElementById("4108")!==null){
				//age declare kora hoise
				document.getElementById("4108").style.opacity="1";
				document.getElementById("4108").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4108").style.setProperty("top","71%");
				document.getElementById("4108").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/8.png';
    			img1.id = 4108;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","110%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}


		else if(working_string[0]=='9'){
			if(document.getElementById("4109")!==null){
				//age declare kora hoise
				document.getElementById("4109").style.opacity="1";
				document.getElementById("4109").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4109").style.setProperty("top","71%");
				document.getElementById("4109").style.setProperty("left","74%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img1.src = 'images/Point/9.png';
    			img1.id = 4109;
    			img1.style.setProperty("position","absolute");
    			img1.style.setProperty("top","110%");
    			img1.style.setProperty("left","74%");
    			img1.style.setProperty("width","2.6%");
    			img1.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img1);
				
				cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);
			}

		}


		


		

		//FOR 2ND DIGIT

			
		


		if(working_string[1]=='0'){
			if(document.getElementById("4200")!==null){
				//age declare kora hoise
				document.getElementById("4200").style.opacity="1";
				document.getElementById("4200").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4200").style.setProperty("top","71%");
				document.getElementById("4200").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/0.png';
    			img2.id = 4200;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","71%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
			

		else if(working_string[1]=='1'){
			if(document.getElementById("4201")!==null){
				//age declare kora hoise
				document.getElementById("4201").style.opacity="1";
				document.getElementById("4201").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4201").style.setProperty("top","71%");
				document.getElementById("4201").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/1.png';
    			img2.id = 4201;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","71%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='2'){
			if(document.getElementById("4202")!==null){
				//age declare kora hoise
				document.getElementById("4202").style.opacity="1";
				document.getElementById("4202").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4202").style.setProperty("top","71%");
				document.getElementById("4202").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/2.png';
    			img2.id = 4202;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","71%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='3'){
			if(document.getElementById("4203")!==null){
				//age declare kora hoise
				document.getElementById("4203").style.opacity="1";
				document.getElementById("4203").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4203").style.setProperty("top","71%");
				document.getElementById("4203").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/3.png';
    			img2.id = 4203;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","71%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='4'){
			if(document.getElementById("4204")!==null){
				//age declare kora hoise
				document.getElementById("4204").style.opacity="1";
				document.getElementById("4204").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4204").style.setProperty("top","71%");
				document.getElementById("4204").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/4.png';
    			img2.id = 4204;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","71%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='5'){
			if(document.getElementById("4205")!==null){
				//age declare kora hoise
				document.getElementById("4205").style.opacity="1";
				document.getElementById("4205").style.setProperty("-webkit76nsition","all 0.3s ease-out");
				document.getElementById("4205").style.setProperty("top","71%");
				document.getElementById("4205").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/5.png';
    			img2.id = 4205;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","71%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='6'){
			if(document.getElementById("4206")!==null){
				//age declare kora hoise
				document.getElementById("4206").style.opacity="1";
				document.getElementById("4206").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4206").style.setProperty("top","71%");
				document.getElementById("4206").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/6.png';
    			img2.id = 4206;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","71%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='7'){
			if(document.getElementById("4207")!==null){
				//age declare kora hoise
				document.getElementById("4207").style.opacity="1";
				document.getElementById("4207").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4207").style.setProperty("top","71%");
				document.getElementById("4207").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/7.png';
    			img2.id = 4207;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","71%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='8'){
			if(document.getElementById("4208")!==null){
				//age declare kora hoise
				document.getElementById("4208").style.opacity="1";
				document.getElementById("4208").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4208").style.setProperty("top","71%");
				document.getElementById("4208").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/8.png';
    			img2.id = 4208;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","71%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}
		else if(working_string[1]=='9'){
			if(document.getElementById("4209")!==null){
				//age declare kora hoise
				document.getElementById("4209").style.opacity="1";
				document.getElementById("4209").style.setProperty("-webkit-transition","all 0.3s ease-out");
				document.getElementById("4209").style.setProperty("top","71%");
				document.getElementById("4209").style.setProperty("left","76%");
				clearTimeout(cusion_point_display_animate);

			}
			else{
				//age declare kora hynay
				img2.src = 'images/Point/9.png';
    			img2.id = 4209;
    			img2.style.setProperty("position","absolute");
    			img2.style.setProperty("top","71%");
    			img2.style.setProperty("left","105%");
    			img2.style.setProperty("width","2.6%");
    			img2.style.setProperty("height","auto");
    	
    			document.getElementById("play_section").appendChild(img2);
    			cusion_point_display_animate = setTimeout(function(){cusion_point_display(present_point,previous_point,player_no)},50);

			}

		}

		

		
		if(first_time_flag4==0){
			first_time_flag4 = 1;
		}
		

	}	
		
	
	
}








window.addEventListener("load",display_start,false);
