import define1 from "./e93997d5089d7165@2303.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["observable_inputs_slice-1_replicate-2.json",new URL("./files/dcff2df9d365be5fa9515289e89cab9a4e38896e542f877a58dc9b72ed8aba4069c4ea9cc1b5386a1a335866db40bcca4fc65776364114fb462626a6769b8145",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Cells and Transcripts`
)});
  main.variable(observer("container")).define("container", ["html"], function(html){return(
html `<div style="height:800px"></div>`
)});
  main.variable(observer()).define(["transcript_data"], function(transcript_data){return(
transcript_data.length
)});
  main.variable(observer()).define(["fovs"], function(fovs){return(
fovs
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Data`
)});
  main.variable(observer("transcript_data")).define("transcript_data", ["promised_data"], function(promised_data){return(
[].concat.apply([], promised_data)
)});
  main.variable(observer("promised_data")).define("promised_data", ["fovs","load_zip_csv"], function(fovs,load_zip_csv){return(
Promise.all(fovs.map(fov => { 
  var csv_result
  try {
    csv_result = load_zip_csv(fov) 
  } catch {
    // hack to force return of some data
    csv_result = load_zip_csv(0)  
  }
  return csv_result
}))
)});
  main.variable(observer("cell_data")).define("cell_data", ["inputs"], function(inputs){return(
inputs['data']
)});
  main.variable(observer("cat_colors")).define("cat_colors", ["inputs"], function(inputs){return(
inputs['cat_colors']
)});
  main.variable(observer("inputs")).define("inputs", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("observable_inputs_slice-1_replicate-2.json").json()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Deck.gl`
)});
  main.variable(observer("cell_layer")).define("cell_layer", ["deck","cell_data","apply_map_morph","radius","is_pickable","radius_min_pixels","select_meta","map_type","transitions"], function(deck,cell_data,apply_map_morph,radius,is_pickable,radius_min_pixels,select_meta,map_type,transitions){return(
new deck.ScatterplotLayer({
      id: 'cell_layer',
      data: cell_data,
      getPosition: apply_map_morph,
      // getFillColor: d => {
      //   var inst_color
    
      //   if (select_meta === 'none'){
      //     inst_color = [50, 50, 50, 100]
      //   } else {

      //     // leiden or gene
      //     if (select_meta === 'leiden'){
      //       var rgb = d3.color(cat_colors[d[select_meta]])
      //       inst_color = [rgb.r, rgb.g, rgb.b, 255 * cat_opacity]          
      //     } else {
      //       var inst_opacity = opacity_scale(parseInt(gene_data[d['name']][select_meta]))
      //       if (inst_opacity > 0){
      //         inst_color = [255, 0, 0, inst_opacity]    
      //       } else {
      //         inst_color = [50, 50, 50, 10]
      //       } 
      //     }            
      //   }
      //   return inst_color
      // },    
      getFillColor: [255, 0, 0, 100],
      getRadius: radius,  
      pickable: is_pickable,

      highlightColor: d => [50, 50, 50], 
      radiusMinPixels: radius_min_pixels,
      updateTriggers: {
        getFillColor: [select_meta],
        getPosition: map_type
      },    
      transitions: transitions
  })
)});
  main.variable(observer("radius")).define("radius", function(){return(
10
)});
  main.variable(observer("map_type")).define("map_type", function(){return(
'Spatial'
)});
  main.variable(observer("radius_min_pixels")).define("radius_min_pixels", function(){return(
1
)});
  main.variable(observer("select_meta")).define("select_meta", function(){return(
'leiden'
)});
  main.variable(observer("transitionDuration")).define("transitionDuration", function(){return(
3000
)});
  main.variable(observer("transitions")).define("transitions", ["transitionDuration","d3"], function(transitionDuration,d3){return(
{
      getPosition: {
        duration:transitionDuration,
        easing: d3.easeCubic
      }
}
)});
  main.variable(observer("apply_map_morph")).define("apply_map_morph", ["map_type","umap_x_scale","umap_y_scale"], function(map_type,umap_x_scale,umap_y_scale){return(
function apply_map_morph(d){        
  var inst_x
  var inst_y
  if (map_type === 'Spatial'){
    inst_x = d.x
    inst_y = -d.y
  } else {
    inst_x = umap_x_scale(d['umap-x'])
    inst_y = - umap_y_scale(d['umap-y'])
  }
  return [inst_x, inst_y]
}
)});
  main.variable(observer("umap_x_scale")).define("umap_x_scale", ["d3","umap_x_min","umap_x_max","x_min","x_max"], function(d3,umap_x_min,umap_x_max,x_min,x_max){return(
d3.scaleLinear()
    .domain([umap_x_min, umap_x_max])
    .range([x_min, x_max])
)});
  main.variable(observer("umap_y_scale")).define("umap_y_scale", ["d3","umap_y_min","umap_y_max","y_min","y_max"], function(d3,umap_y_min,umap_y_max,y_min,y_max){return(
d3.scaleLinear()
    .domain([umap_y_min, umap_y_max])
    .range([y_min, y_max])
)});
  main.variable(observer("x_min")).define("x_min", ["cell_data"], function(cell_data){return(
Math.min.apply(Math, cell_data.map(function(o) { return parseFloat(o['x']) }))
)});
  main.variable(observer("x_max")).define("x_max", ["cell_data"], function(cell_data){return(
Math.max.apply(Math, cell_data.map(function(o) { return parseFloat(o['x']) }))
)});
  main.variable(observer("y_min")).define("y_min", ["cell_data"], function(cell_data){return(
Math.min.apply(Math, cell_data.map(function(o) { return parseFloat(o['y']) }))
)});
  main.variable(observer("y_max")).define("y_max", ["cell_data"], function(cell_data){return(
Math.max.apply(Math, cell_data.map(function(o) { return parseFloat(o['y']) }))
)});
  main.variable(observer("umap_x_min")).define("umap_x_min", ["cell_data"], function(cell_data){return(
Math.min.apply(Math, cell_data.map(function(o) { return parseFloat(o['umap-x']) }))
)});
  main.variable(observer("umap_x_max")).define("umap_x_max", ["cell_data"], function(cell_data){return(
Math.max.apply(Math, cell_data.map(function(o) { return parseFloat(o['umap-x']) }))
)});
  main.variable(observer("umap_y_min")).define("umap_y_min", ["cell_data"], function(cell_data){return(
Math.min.apply(Math, cell_data.map(function(o) { return parseFloat(o['umap-y']) }))
)});
  main.variable(observer("umap_y_max")).define("umap_y_max", ["cell_data"], function(cell_data){return(
Math.max.apply(Math, cell_data.map(function(o) { return parseFloat(o['umap-y']) }))
)});
  main.variable(observer("transcript_layer")).define("transcript_layer", ["deck","transcript_data","is_pickable"], function(deck,transcript_data,is_pickable){return(
new deck.ScatterplotLayer({
      id: 'transcript_layer',
      data: transcript_data,
      pickable: is_pickable,
      getPosition: d => [d.x, - d.y],
      getColor: [0, 0, 255, 100],
      getRadius: 0.25,
      radiusMinPixels: 0.5,  
      opacity: 0.5,
      pickable: true
    })
)});
  main.variable(observer("layers")).define("layers", ["cell_layer","transcript_layer"], function(cell_layer,transcript_layer){return(
[cell_layer, transcript_layer]
)});
  main.variable(observer("is_pickable")).define("is_pickable", function(){return(
true
)});
  main.variable(observer()).define(["deckgl","layers"], function(deckgl,layers){return(
deckgl.setProps({layers: layers})
)});
  main.variable(observer("view")).define("view", ["deck"], function(deck){return(
new deck.OrthographicView({id: 'ortho'})
)});
  main.variable(observer("deckgl")).define("deckgl", ["deck","container","view","initial_view_state","debounced_something"], function(deck,container,view,initial_view_state,debounced_something)
{
  return new deck.DeckGL({
    container,
    views:[view],
    initialViewState: initial_view_state,
    controller: true,
    getTooltip: ({object}) => {
      return object && 
        `pos: ${object.x}, ${object['y']}\n`
    },

    onViewStateChange: ({viewState}) => {
      debounced_something(viewState)
      return viewState
    }
    
    
  });
}
);
  main.variable(observer("initial_view_state")).define("initial_view_state", function(){return(
{
  target: [2000, 7000, 0],
  zoom: -3.5,
  minZoom:-10,
  maxZoom:10
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Variables`
)});
  main.variable(observer("inst_zoom")).define("inst_zoom", function(){return(
6
)});
  main.variable(observer("inst_lat")).define("inst_lat", function(){return(
1
)});
  main.variable(observer("inst_lng")).define("inst_lng", function(){return(
1
)});
  main.variable(observer("height")).define("height", function(){return(
800
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Fetching Functions`
)});
  main.variable(observer("something")).define("something", ["mutable fovs","cell_data"], function($0,cell_data){return(
function something(viewState){
  
  var height = viewState.height
  var width = viewState.width
  
  var zoom = Math.pow(2, viewState.zoom)
  if (zoom > 1){
  
    var target_x = viewState.target[0]
    var target_y = viewState.target[1]
    
    var min_x = target_x - width/(2*zoom)
    var max_x = target_x + width/(2*zoom)
  
    var min_y = target_y - height/(2*zoom)
    var max_y = target_y + height/(2*zoom)
  
    $0.value = cell_data.filter(d => d.x >= min_x)
                        .filter(d => d.x <  max_x)
                        // y values are inverted
                        .filter(d => -d.y >= min_y)
                        .filter(d => -d.y <  max_y)
                        .map(x => x.fov)
                        .filter((x, i, a) => a.indexOf(x) === i)
    
    //console.log('length of fovs', fovs.length)
  }
}
)});
  main.variable(observer("debounced_something")).define("debounced_something", ["debounce","something"], function(debounce,something){return(
debounce(something, 250)
)});
  main.variable(observer("debounce")).define("debounce", function(){return(
function debounce(func, wait, immediate) {
  // 'private' variable for instance
  // The returned function will be able to reference this due to closure.
  // Each call to the returned function will share this common timer.
  var timeout;

  // Calling debounce returns a new anonymous function
  return function() {
    // reference the context and args for the setTimeout function
    var context = this,
      args = arguments;

    // Should the function be called now? If immediate is true
    //   and not already in a timeout then the answer is: Yes
    var callNow = immediate && !timeout;

    // This is the basic debounce behaviour where you can call this 
    //   function several times, but it will only execute once 
    //   [before or after imposing a delay]. 
    //   Each time the returned function is called, the timer starts over.
    clearTimeout(timeout);

    // Set the new timeout
    timeout = setTimeout(function() {

      // Inside the timeout function, clear the timeout variable
      // which will let the next execution run when in 'immediate' mode
      timeout = null;

      // Check if the function already ran with the immediate flag
      if (!immediate) {
        // Call the original function with apply
        // apply lets you define the 'this' object as well as the arguments 
        //    (both captured before setTimeout)
        func.apply(context, args);
      }
    }, wait);

    // Immediate mode and no wait timer? Execute the function..
    if (callNow) func.apply(context, args);
  }
}
)});
  main.define("initial fovs", function(){return(
[]
)});
  main.variable(observer("mutable fovs")).define("mutable fovs", ["Mutable", "initial fovs"], (M, _) => new M(_));
  main.variable(observer("fovs")).define("fovs", ["mutable fovs"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`# Requirements`
)});
  main.variable(observer("deck")).define("deck", ["require"], function(require){return(
require.alias({
  // optional dependencies
  h3: {}
})('deck.gl@latest/dist.min.js')
)});
  const child1 = runtime.module(define1);
  main.import("text", child1);
  main.variable(observer("load_zip_csv")).define("load_zip_csv", ["jszip","d3"], function(jszip,d3){return(
function load_zip_csv(region) {

  const url = 'https://raw.githubusercontent.com/cornhundred/testing_something/master/transcripts_csv_zip_round/' +
         String(region) + '.csv.zip'

  const data = fetch(url)
          .then(x => x.arrayBuffer())
          .then(x => jszip.loadAsync(x))
          .then(buf => {
            const file = Object.keys(buf.files)[0];
            const js_array = buf.file(file)
                                .async("string")
                                .then(x => d3.csvParse(x, d3.autoType))
            return js_array
          })   

  return data  
}
)});
  main.variable(observer("jszip")).define("jszip", ["require"], function(require){return(
require("jszip@3/dist/jszip.min.js")
)});
  return main;
}
