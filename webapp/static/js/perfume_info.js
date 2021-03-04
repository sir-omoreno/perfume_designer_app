    var definitions = {
      accord: "A combination of raw materials blended together to find the proper balance and effect a perfumer desires when creating a fragrance. When the materials are properly mixed, they are said to be in accordance with each other.",
      top_note: "The immediate effect of a fragrance upon the sense of smell. This expression is commonly used in connection with an impact of fragrance upon application to the skin. Careful consideration of this top note is highly important in the design of a fragrance since the initial sales appeal may be totally dependent upon its quality. Chemically, the top note is the most volatile material in the composition of the fragrance oil and often it is deliberately accentuated by the use of a highly volatile chemical; i.e.,in the French practice of using a trace of methyl acetate or propionic aldehydes to emphasize the first “fruity” effect of a cologne top note.",
      mid_note: "The middle or “heart” notes make up a main blend of a fragrance that classifies the fragrance family or accord. It usually takes from ten to twenty minutes for the middle notes to fully develop on the skin.",
      base_note: "Base notes are made up of the underlying tones of the fragrance, and are responsible for its lasting qualities. The ingredients used in base notes are often referred to as the “fixatives.",
      sillage: "A French term that is commonly used to discuss a fragrance's diffuseness, an ability of a scent to be smelled at a distance; the bigger the distance, the stronger the sillage.",
      longevity: "Refers to how long a fragrance lasts once applied. A frangrance an have a huge sillage but short longevity, and vice versa."
    };
   
    // Initialize tool tip
    var toolTip = d3.select("body").append("div")
    .attr("class", "ourtooltip");
    
    // Create tooltip in the page
    // ==============================
    var circle1_select = d3.select("body").select("#dashboard-circle1")
    var circle2_select = d3.select("body").select("#dashboard-circle2")
    var circle3_select = d3.select("body").select("#dashboard-circle3")
    var circle4_select = d3.select("body").select("#dashboard-circle4")
    var circle5_select = d3.select("body").select("#dashboard-circle5")
    var circle6_select = d3.select("body").select("#dashboard-circle6")

    circle1_select.on("mouseover", function(d, i) {
      toolTip.style("display", "block");
      toolTip.html("<p> A top note is the immediate effect of a fragrance upon the sense of smell. This expression is commonly used in connection with an impact of fragrance upon application to the skin. Careful consideration of this top note is highly important in the design of a fragrance since the initial sales appeal may be totally dependent upon its quality. Chemically, the top note is the most volatile material in the composition of the fragrance oil and often it is deliberately accentuated by the use of a highly volatile chemical; i.e.,in the French practice of using a trace of methyl acetate or propionic aldehydes to emphasize the first “fruity” effect of a cologne top note.</p>")
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY + "px");
    })
    .on("mouseout", function(){
      toolTip.style("display", "none")
    })

    circle2_select.on("mouseover", function(d, i) {
      toolTip.style("display", "block");
      toolTip.html("<p>The middle or “heart” notes make up the main blend of a fragrance that classifies the fragrance family or accord. It usually takes from ten to twenty minutes for the middle notes to fully develop on the skin.</p>")
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY + "px");
    })
    .on("mouseout", function(){
      toolTip.style("display", "none")
    })

    circle3_select.on("mouseover", function(d, i) {
      toolTip.style("display", "block");
      toolTip.html("<p>The accord is the combination of raw materials blended together to find the proper balance and effect a perfumer desires when creating a fragrance. When the materials are properly mixed, they are said to be in accordance with each other.</p>")
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY + "px");
    })
    .on("mouseout", function(){
      toolTip.style("display", "none")
    })

    circle4_select.on("mouseover", function(d, i) {
      toolTip.style("display", "block");
      toolTip.html("<p>Base notes are made up of the underlying tones of the fragrance, and are responsible for its lasting qualities. The ingredients used in base notes are often referred to as the 'fixatives'.</p>")
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY + "px");
    })
    .on("mouseout", function(){
      toolTip.style("display", "none")
    })

    circle5_select.on("mouseover", function(d, i) {
      toolTip.style("display", "block");
      toolTip.html("<p>Sillage is a French term commonly used to describe a fragrance's diffuseness, or the ability of a scent to be smelled at a distance: the longer the distance, the stronger the sillage.</p>")
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY + "px");
    })
    .on("mouseout", function(){
      toolTip.style("display", "none")
    })

    circle6_select.on("mouseover", function(d, i) {
      toolTip.style("display", "block");
      toolTip.html("<p>Longevity refers to how long a fragrance lasts once applied. A frangrance an have a huge sillage but short longevity, and vice versa.</p>")
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY + "px");
    })
    .on("mouseout", function(){
      toolTip.style("display", "none")
    })
;