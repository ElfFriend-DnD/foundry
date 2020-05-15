const PowerCards = (() => {
	// VERSION INFORMATION
	const PowerCards_Author = "Sky#9453";
	const PowerCards_Version = "0.0.1";
	const PowerCards_LastUpdated = 1589548249;
	
	// CONFIGURATION
	var USE_PLAYER_COLOR_EMOTE = false;
	var USE_PLAYER_COLOR_TITLE = true;
	
	// FUNCTIONS
	function getBrightness(hex) {
		return ((getHex2Dec(hex.substr(1, 2)) * 299) + (getHex2Dec(hex.substr(3, 2)) * 587) + (getHex2Dec(hex.substr(5, 2)) * 114)) / 1000;
	};

	function getHex2Dec(hex_string) {
		hex_string = (hex_string + "").replace(/[^a-f0-9]/gi, "");
		return parseInt(hex_string, 16);
	};
	
	const handleInput = function(message, chatData) {
		if ( chatData.charAt(0) === "!") {
			let who = game.user.data.name;
			let command = chatData.split(" ")[0].trim();
			let content = chatData.replace(command, "").trim()
			let card = {};
			
			// DEFAULT FORMATTING
			let playerBGColor = game.user.data.color;
			let playerTXColor = (getBrightness(playerBGColor) < (255 / 2)) ? "#FFFFFF" : "#000000";
			
			// EMOTE
			card.avatar = (game.user.character == null) ? game.user.avatar : game.user.character.img;
			card.emote_bgcolor = (USE_PLAYER_COLOR_EMOTE) ? playerBGColor : "transparent";
			card.emote_txcolor = (USE_PLAYER_COLOR_EMOTE) ? playerTXColor : "#000000";
			card.emote_border = "none";
			card.emote_borderradius = "0px";
			card.emote_fontsize = "1em";
			card.emote_fontweight = "normal";
			card.emote_fontstyle = "italic";
			card.emote_textalign = "center";
			card.emote_margin = "0px";
			card.emote_padding = "2px 0px";
			
			// TITLE
			card.title_bgcolor = (USE_PLAYER_COLOR_TITLE) ? playerBGColor : "#FFFFFF";
			card.title_txcolor = (USE_PLAYER_COLOR_TITLE) ? playerTXColor : "#000000";
			card.title_border = "1px solid #000";
			card.title_borderradius = "5px";
			card.title_fontsize = "1.2em";
			card.title_fontweight = "bold";
			card.title_fontstyle = "normal";
			card.title_textalign = "center";
			card.title_margin = "1px 0px 1px 0px";
			card.title_padding = "2px 5px 2px 5px";
			
			// SUBTITLE
			card.subtitle_fontsize = "0.8em";
			card.subtitle_fontweight = "normal";
			card.subtitle_fontstyle = "italic";
			card.subtitle_textalign = "center";
			
			// GUTS FORMATTING
			card.orow_txcolor = "#000000";
			card.orow_bgcolor = "#CEC7B6";
			card.erow_txcolor = "#000000";
			card.erow_bgcolor = "#B6AB91";
			card.guts_lineheight = "1.1em";
			card.guts_border = "1px solid #000000";
			card.guts_borderradius = "5px";
			card.guts_fontsize = "1em";
			card.guts_fontweight = "normal";
			card.guts_fontstyle = "normal";
			card.guts_textalign = "left";
			card.guts_margin = "0px";
			card.guts_padding = "6px 2px 5px 2px";
		
			// ADD CONTENT TO CARD
			content = content.replace(/<br\/>\n/g, " ").replace(/({{(.*?)}})/g, " $2 ").trim().slice(2, content.length - 2).split(/\s+--/);
			content.forEach(function (a) {
				if (a !== "") card[a.substring(0, a.indexOf("|")).trim()] = a.substring(a.indexOf("|") + 1).trim();
			});
			
			// EMOTE & TITLE
			let avatar = (card.avatar !== undefined) ? `padding: 0px 5px 0px 50px; background-image: url("${card.avatar}"); background-size: 50px 50px; background-position: left; background-repeat: no-repeat; height: 50px; min-height: 50px;` : ``;
			let emote = (card.emote !== undefined) ? `<div style = 'display: table-cell; background-color: ${card.emote_bgcolor}; color: ${card.emote_txcolor}; border: ${card.emote_border}; border-radius: ${card.emote_borderradius}; vertical-align: middle; text-align: ${card.emote_textalign}; font-size: ${card.emote_fontsize}; font-weight: ${card.emote_fontweight}; font-style: ${card.emote_fontstyle}; ${avatar}'>${card.emote}</div>` : ``;
			let title = (card.title === undefined) ? `` : `` +
				`<div style = 'display: block; background-color: ${card.title_bgcolor}; color: ${card.title_txcolor}; border: ${card.title_border}; border-radius: ${card.title_borderradius}; background-image: linear-gradient(rgba(255, 255, 255, .3), rgba(255, 255, 255, 0)); margin: ${card.title_margin}; padding: ${card.title_padding};'>` +
				`<div style = 'text-align: ${card.title_textalign}; font-size: ${card.title_fontsize}; font-weight: ${card.title_fontweight}; font-style: ${card.title_fontstyle};'>${card.title}</div>` +
				`<div style = 'text-align: ${card.subtitle_textalign}; font-size: ${card.subtitle_fontsize}; font-weight: ${card.subtitle_fontweight}; font-style: ${card.subtitle_fontstyle};'>${card.subtitle}</div>` +
				`</div>`;
			
			// REMOVE FORMATTING TAGS
			let keys = Object.keys(card);
			let tags_to_remove = ["", "emote_bgcolor", "emote_txcolor", "emote_border", "emote_borderradius", "emote_fontsize", "emote_fontweight", "emote_fontstyle", "emote_textalign", "emote_margin", "emote_padding", "title_bgcolor", "title_txcolor", "title_border", "title_borderradius", "title_fontsize", "title_fontweight", "title_fontstyle", "title_textalign", "title_margin", "title_padding", "subtitle_fontsize", "subtitle_fontweight", "subtitle_fontstyle", "subtitle_textalign", "orow_txcolor", "orow_bgcolor", "erow_txcolor", "erow_bgcolor", "guts_lineheight", "guts_border", "guts_borderradius", "guts_fontsize", "guts_fontweight", "guts_fontstyle", "guts_textalign", "guts_margin", "guts_padding", "tokenid", "emote", "title", "subtitle", "avatar"];
			tags_to_remove.forEach(function (b) {
				if (keys.indexOf(b) !== -1) keys.splice(keys.indexOf(b), 1);
			});
			
			// CREATE FINAL CARD
			let final_card = (keys.length != 0) ? `<div style = 'border: ${card.guts_border}; border-radius: ${card.guts_borderradius}; background-color: ${card.orow_bgcolor};'>` : ``;
			let key_count = 1;
			let row_number = 1;
			let row_style = `line-height: ${card.guts_lineheight}; font-size: ${card.guts_fontsize}; font-weight: ${card.guts_fontweight}; font-style: ${card.guts_fontstyle}; text-align: ${card.guts_textalign}; margin: ${card.guts_margin}; padding: ${card.guts_padding};`;
			let row_odd = `color: ${card.orow_txcolor}; background-color: ${card.orow_bgcolor};`;
			let row_even = `color: ${card.erow_txcolor}; background-color: ${card.erow_bgcolor};`;
			
			keys.forEach(function (tag) {
				let guts = card[tag];
				row_style += (row_number % 2 === 1) ? row_odd : row_even;
				if (row_number == 1 && keys.length == 1) row_style += `border-radius: ${card.guts_borderradius};`;
				if (row_number == 1 && keys.length > 1) row_style += `border-radius: ${card.guts_borderradius} ${card.guts_borderradius} 0px 0px;`;
				if (row_number != 1 && key_count != keys.length) row_style += `border-radius: 0px;`;
				if (row_number != 1 && key_count == keys.length) row_style += `border-radius: 0px 0px ${card.guts_borderradius} ${card.guts_borderradius}`;
				final_card += `<div style = '${row_style}'><b>${tag}</b> ${guts}</div>`;
				key_count++;
				row_number++;
			});
			
			// SEND TO CHAT
			ChatMessage.create({
				user: game.user._id,
				speaker: { alias: who },
				content: emote + title + final_card + "</div>",
				type: CONST.CHAT_MESSAGE_TYPES.OTHER,
				sound: ""
			});
		}
		
		// Don't send to chat...
		return false;
	};
	
	// HOOKS
	Hooks.on("ready", function() {
		Hooks.on("chatMessage", handleInput);
		console.log("-=> PowerCards v" + PowerCards_Version + " <=- [" + (new Date(PowerCards_LastUpdated * 1000)) + "]");
		//console.log(Date.now().toString().substr(0, 10));
	});
})();