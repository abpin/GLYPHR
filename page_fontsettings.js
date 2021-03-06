
	function loadPage_fontsettings(){
		debug("LOADING PAGE >> loadPage_fontsettings");
		// SETTINGS
		var ps = _GP.projectsettings;

		var content = "<div class='pagecontent textpage'><h1>Font Settings</h1>";
		content += "<p style='margin-bottom:20px;'>These properties are used by the Glyphr project while you are designing this font.  By default, these are the same as some of the OpenType settings below." +
					"<br><i>Values will be saved as you change them</i>.</p>";
		
		content += "<h3>Character Proportions</h3>"; 
		content += "Glyphr projects export OpenType fonts with PostScript outlines.  Characters in this kind of font have a total height of 1000 Em units. "+
					"The baseline is the one main dividing line for each character, with the ascent and descent above it and below it. " + 
					"Some characters, like p and y, fall below the baseline into the descent.<br>" + 
					"<table class='fontmetricstable'>"+
					"<tr><td>Ascent height: </td><td><input type='text' value='"+ps.ascent+"' onchange='updateAscender(this.value);'>"+spinner()+"</td><td></td><td><span class='unit'>(em units)</span></td></tr>" + 
					"<tr><td>Descent height: </td><td><input type='text' id='metric-des' disabled='disabled' value='"+(ps.ascent - ps.upm)+"'/></td><td></td><td><span class='unit'>(em units)</span></td></tr>" + 
					"<tr><td>Total Units per Em: </td><td><input type='text' disabled='disabled' value='"+ps.upm+"'/></td><td></td><td><span class='unit'>(em units)</span></td></tr>" + 
					"</table><br>";

		content += "<h3>Default Left Side Bearing</h3>" + 
					"This is the amount of blank space that is added to the left of characters when they are displayed.  This metric can be set individually per character, but will default to this value if not set. "+
					"<table class='fontmetricstable'>"+
					"<tr><td>Left Side Bearing: </td><td><input type='text' value='"+ps.defaultlsb+"' onchange='_GP.projectsettings.lsb = this.value;'>"+spinner()+"</td><td><span class='unit'>(em units)</span></td></tr>"+		
					"</table><br>";

		content += "<h3>Line Gap</h3>" + 
					"This is the amount of vertical space between characters on separate lines. This is recomended to be 20% to 25% of the total Units per Em."+
					"<table class='fontmetricstable'>"+
					"<tr><td>Line Gap: </td><td><input type='text' value='"+ps.linegap+"' onchange='_GP.projectsettings.linegap = this.value;'>"+spinner()+"</td><td><span class='unit'>(em units)</span></td></tr>"+	
					"</table><br>";

		// METADATA
		content += "<br><h1>OpenType Properties</h1>" + 
			"<p style='margin-bottom:20px;'>These properties will be saved directly to the various OpenType tables when the font is exported to TTX format.  More information about all of these properties can be found in the <a href='http://www.microsoft.com/typography/otspec/otff.htm#otttables' target=_new>OpenType Specification</a>." + 
			"<br><i>Values will be saved as you change them</i>.</p>";
		


		content += "<h2>Tables</h2>";

		var otp = _GP.opentypeproperties;


		// NAME TABLE
		content += "<h3>name</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";
		
		for(var i=0; i<otp.name.length; i++){
			if(i!=7){
				content += "<tr><td class='propname'>" + otp.name[i].key + "</td><td><input type='text' value='" + otp.name[i].val + "' onchange='_GP.opentypeproperties.name[" + i + "].val = this.value;' /></td></tr>";
			}
		}
		content += "</table>";


		// HEAD TABLE
		content += "<h3>head</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";
		
		for(var j=0; j<otp.head.length; j++){
			content += "<tr><td class='propname'>" + otp.head[j].key + "</td><td><input type='text' value='" + otp.head[j].val + "' onchange='setOTprop(\"head\", \"" + otp.head[j].key + "\", this.value);' /></td></tr>";
		}
		content += "</table>";


		// OS/2 TABLE
		content += "<h3>os/2</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";
		
		for(var k=0; k<otp.os_2.length; k++){
			content += "<tr><td class='propname'>" + otp.os_2[k].key + "</td><td><input type='text' value='" + otp.os_2[k].val + "' onchange='setOTprop(\"os_2\", \"" + otp.os_2[k].key + "\", this.value);' /></td></tr>";
		}
		content += "</table>";


		// POST TABLE
		content += "<h3>post</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";
		
		for(var m=0; m<otp.post.length; m++){
			content += "<tr><td class='propname'>" + otp.post[m].key + "</td><td><input type='text' value='" + otp.post[m].val + "' onchange='setOTprop(\"post\", \"" + otp.post[m].key + "\", this.value);' /></td></tr>";
		}
		content += "</table>";


		// CFF TABLE
		content += "<h3>cff</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";
		
		for(var n=0; n<otp.cff.length; n++){
			content += "<tr><td class='propname'>" + otp.cff[n].key + "</td><td><input type='text' value='" + otp.cff[n].val + "' onchange='setOTprop(\"cff\", \"" + otp.cff[n].key + "\", this.value);' /></td></tr>";
		}
		content += "</table>";


			
		content += "</div>";
		document.getElementById("mainwrapper").innerHTML = content;
	}

	function updateAscender(val){
		var ps = _GP.projectsettings;
		ps.ascent = Math.max(0, Math.min(ps.upm, round(val)));
		document.getElementById('metric-des').value = (ps.ascent - ps.upm);
	}