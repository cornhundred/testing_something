import define1 from "./e93997d5089d7165@2303.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["observable_inputs_slice-1_replicate-2.json",new URL("./files/dcff2df9d365be5fa9515289e89cab9a4e38896e542f877a58dc9b72ed8aba4069c4ea9cc1b5386a1a335866db40bcca4fc65776364114fb462626a6769b8145",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Cells, Transcripts, UMAP, Cell Polygons`
)});
  main.variable(observer("dashboard")).define("dashboard", ["html","viewof map_type","viewof select_meta_dropdown","container"], function(html,$0,$1,container){return(
html`
  <div id='dashboard'>
    <div style="display: flex;">
     <div style="margin-left: 15px; margin-right: -20px; border:1px; text-align:right;">${$0} </div>
     <div id="meta_dropdown", style="margin-right: 15px; border:1px; text-align:right;">${$1} </div>
    </div>
  
    <div>
      ${container}
    </div>
</div>
`
)});
  main.variable(observer()).define(["fovs"], function(fovs){return(
fovs
)});
  main.variable(observer("viewof select_meta_dropdown")).define("viewof select_meta_dropdown", ["select","meta_data_cols","ini_cat"], function(select,meta_data_cols,ini_cat){return(
select({'options':['none'].concat(meta_data_cols), value: ini_cat})
)});
  main.variable(observer("select_meta_dropdown")).define("select_meta_dropdown", ["Generators", "viewof select_meta_dropdown"], (G, _) => G.input(_));
  main.define("initial select_meta", ["select_meta_dropdown"], function(select_meta_dropdown){return(
select_meta_dropdown
)});
  main.variable(observer("mutable select_meta")).define("mutable select_meta", ["Mutable", "initial select_meta"], (M, _) => new M(_));
  main.variable(observer("select_meta")).define("select_meta", ["mutable select_meta"], _ => _.generator);
  main.variable(observer()).define(["select_meta_dropdown"], function(select_meta_dropdown){return(
select_meta_dropdown
)});
  main.variable(observer("ini_cat")).define("ini_cat", ["inputs"], function(inputs){return(
inputs['ini_cat']
)});
  main.variable(observer("container")).define("container", ["html"], function(html){return(
html `<div style="height:800px; border-style:solid; border-color:#d3d3d3; border-width:1px"></div>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Data`
)});
  main.variable(observer()).define(["promised_data"], function(promised_data){return(
promised_data
)});
  main.variable(observer("transcript_data_ini")).define("transcript_data_ini", ["promised_data"], function(promised_data){return(
[].concat.apply([], promised_data)
)});
  main.variable(observer()).define(["select_meta"], function(select_meta){return(
select_meta
)});
  main.variable(observer("transcript_data")).define("transcript_data", ["transcript_data_ini","barcode_id_gene_dictionary","select_meta"], function(transcript_data_ini,barcode_id_gene_dictionary,select_meta){return(
transcript_data_ini.map(x => {
  var new_obj

  var inst_gene = barcode_id_gene_dictionary[x.barcode_id]

  // allow transcript color filtering
  if (['leiden', 'none'].includes(select_meta)){
    new_obj = ({
      '': x[''],
      'name': inst_gene,
      'barcode_id': x.barcode_id,
      'position': eval(x.position),
      'color': eval(x.color),  
    })
  } else {
    var inst_color = [0, 0, 0, 15]

    // check gene name
    if (inst_gene === select_meta){
      inst_color = eval(x.color)
    }
    new_obj = ({
      '': x[''],
      'barcode_id': x.barcode_id,
      'name': inst_gene,
      'position': eval(x.position),
      'color': inst_color,  
    })    
    
  }
  return new_obj
})
)});
  main.variable(observer("promised_data")).define("promised_data", ["fovs","map_type","load_zip_csv"], function(fovs,map_type,load_zip_csv){return(
Promise.all(fovs.map(fov => { 
  
    const url = 'https://raw.githubusercontent.com/cornhundred/testing_something/master/transcripts_csv_zip_round_colors/' +
         String(fov) + '.csv.zip'

    var unzipped_csv 
    if (map_type === 'Spatial'){
      unzipped_csv = load_zip_csv(url)   
    } else {
      unzipped_csv = []
    } 
    
  return unzipped_csv
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
  main.variable(observer("cell_layer")).define("cell_layer", ["deck","cell_data","apply_map_morph","select_meta","d3","cat_colors","cat_opacity","opacity_scale","gene_data","radius","is_pickable","radius_min_pixels","map_type","transitions"], function(deck,cell_data,apply_map_morph,select_meta,d3,cat_colors,cat_opacity,opacity_scale,gene_data,radius,is_pickable,radius_min_pixels,map_type,transitions){return(
new deck.ScatterplotLayer({
      id: 'cell_layer',
      data: cell_data,
      getPosition: apply_map_morph,
      getFillColor: d => {
        var inst_color
    
        if (select_meta === 'none'){
          inst_color = [50, 50, 50, 100]
        } else {

          // leiden or gene
          if (select_meta === 'leiden'){
            var rgb = d3.color(cat_colors[d[select_meta]])
            inst_color = [rgb.r, rgb.g, rgb.b, 255 * cat_opacity]          
          } else {
            var inst_opacity = opacity_scale(parseInt(gene_data[d['name']][select_meta]))
            if (inst_opacity > 0){
              inst_color = [255, 0, 0, inst_opacity]    
            } else {
              inst_color = [50, 50, 50, 10]
            } 
          }            
        }
        return inst_color
      },    
      
      getRadius: radius,  
      pickable: is_pickable,
      highlightColor: d => [50, 50, 50], 
      radiusMinPixels: radius_min_pixels,
      updateTriggers: {
        getFillColor: select_meta,
        getPosition: map_type
      },    
      transitions: transitions
  })
)});
  main.variable(observer("radius")).define("radius", function(){return(
2
)});
  main.variable(observer("radius_min_pixels")).define("radius_min_pixels", function(){return(
1
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
  main.variable(observer("transcript_layer")).define("transcript_layer", ["deck","transcript_data","is_pickable","map_type","visible_transcripts","d3","mutable select_meta"], function(deck,transcript_data,is_pickable,map_type,visible_transcripts,d3,$0){return(
new deck.ScatterplotLayer({
      id: 'transcript_layer',
      data: transcript_data,
      pickable: is_pickable,
      // getPosition: d => [d.x, - d.y],
      getPosition: d => d.position,  
      getFillColor: d => {
        var color
        if (map_type === 'Spatial'){
          color = d.color
        } else {
          color = [0, 0, 0, 0]
        }
        return color
      },
      getRadius: 0.25,
      radiusMinPixels: 0.5,  
      // opacity: d => {
      //   var opacity
      //   if (map_type === 'Spatial'){
      //     opacity = 0.5
      //   } else {
      //     opacity = 0.0
      //   }
      //   return opacity
      // },
      pickable: true,
      visible: visible_transcripts,
      updateTriggers: {
        getFillColor: map_type,
      },     
      onClick: (info, event) => {
        if (d3.select('#meta_dropdown').select('select').node().value !== info.object.name){
          $0.value = info.object.name
          d3.select('#meta_dropdown').select('select').node().value = info.object.name
        } else {
          $0.value = 'leiden'
          d3.select('#meta_dropdown').select('select').node().value = 'leiden'
        }
        // console.log('Transcript Clicked:', info.object.name)
      }
    })
)});
  main.define("initial visible_transcripts", function(){return(
false
)});
  main.variable(observer("mutable visible_transcripts")).define("mutable visible_transcripts", ["Mutable", "initial visible_transcripts"], (M, _) => new M(_));
  main.variable(observer("visible_transcripts")).define("visible_transcripts", ["mutable visible_transcripts"], _ => _.generator);
  main.variable(observer("layers")).define("layers", ["cell_layer","polygon_layer","transcript_layer"], function(cell_layer,polygon_layer,transcript_layer){return(
[cell_layer, polygon_layer, transcript_layer]
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
    // controller: true,
    controller: {doubleClickZoom: false},
    // getTooltip: ({object}) => {
    //   return object && 
    //     `${object['name']}`
    //     // `pos: ${object.x}, ${object['y']}\n`
    // },
    getTooltip: ({object}) => object && {
      html: `${object.name}`,
      style: {
        fontSize: '0.8em',
        padding: '5px',
      }
    },
    onViewStateChange: ({viewState}) => {
      debounced_something(viewState)
      return viewState
    },
    // onClick: ({info}) => {
    //   console.log(info)
    //   return info
    // }
        
  });
}
);
  main.variable(observer("initial_view_state")).define("initial_view_state", function(){return(
{
  target: [2000, 7000, 0],
  zoom: -3.5,
  minZoom: -3.75,
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
  main.variable(observer("detail_zoom_thresh")).define("detail_zoom_thresh", function(){return(
1.25
)});
  main.variable(observer("something")).define("something", ["detail_zoom_thresh","mutable fovs","cell_data","mutable visible_transcripts"], function(detail_zoom_thresh,$0,cell_data,$1){return(
function something(viewState){
  
  var height = viewState.height
  var width = viewState.width
  
  var zoom = Math.pow(2, viewState.zoom)
  if (zoom > detail_zoom_thresh){
  
    var target_x = viewState.target[0]
    var target_y = viewState.target[1]
    
    var min_x = target_x - width/(2*zoom)
    var max_x = target_x + width/(2*zoom)
  
    var min_y = target_y - height/(2*zoom)
    var max_y = target_y + height/(2*zoom)
  
    $0.value = cell_data
                        .filter(d => d.x >= min_x)
                        .filter(d => d.x <  max_x)
                        // y values are inverted
                        .filter(d => -d.y >= min_y)
                        .filter(d => -d.y <  max_y)
                        .map(x => x.fov)
                        .filter((x, i, a) => a.indexOf(x) === i)

    $1.value = true
    
  } else {
    $1.value = false
  }
}
)});
  main.variable(observer()).define(["visible_transcripts"], function(visible_transcripts){return(
visible_transcripts
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
function load_zip_csv(url) {

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
  main.variable(observer()).define(["md"], function(md){return(
md`# Testing`
)});
  main.variable(observer("tmp_url")).define("tmp_url", function(){return(
'https://raw.githubusercontent.com/cornhundred/testing_something/master/transcripts_csv_zip_round_colors/' +
         String(100) + '.csv.zip'
)});
  main.variable(observer()).define(["load_zip_csv","tmp_url"], function(load_zip_csv,tmp_url){return(
load_zip_csv(tmp_url)
)});
  main.define("initial tmp1", function(){return(
[]
)});
  main.variable(observer("mutable tmp1")).define("mutable tmp1", ["Mutable", "initial tmp1"], (M, _) => new M(_));
  main.variable(observer("tmp1")).define("tmp1", ["mutable tmp1"], _ => _.generator);
  main.variable(observer("tmp2")).define("tmp2", function(){return(
[]
)});
  main.variable(observer()).define(["mutable tmp1","tmp2"], function($0,tmp2){return(
$0.value.push(tmp2)
)});
  main.variable(observer("polygon_layer")).define("polygon_layer", ["deck","cell_polygons","visible_transcripts"], function(deck,cell_polygons,visible_transcripts){return(
new deck.PolygonLayer({
    id: 'polygon_layer',
    data: cell_polygons,
    // getFillColor: [250, 0, 0],
    getLineColor: [0, 0, 0, 150],
    getLineWidth: d => 0.2,
    getPolygon: d => d.coordinates,
    stroked: true,
    filled: false,
    wireframe: true,
    pickable: true,
    lineWidthMinPixels: 0.1,
    visible: visible_transcripts,
    // opacity: rescue_opacity
  })
)});
  main.variable(observer()).define(["mutable tmp1"], function($0){return(
$0.value
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Cell-Level Gene`
)});
  main.variable(observer("data_ini")).define("data_ini", ["inputs"], function(inputs){return(
inputs['data']
)});
  main.variable(observer("data")).define("data", ["data_ini"], function(data_ini){return(
data_ini
)});
  main.variable(observer("gene_data_url")).define("gene_data_url", ["select_meta"], function(select_meta){return(
'https://raw.githubusercontent.com/cornhundred/testing_something/master/per-gene-counts_slice-1_replicate-2/' + select_meta + '.csv'
)});
  main.variable(observer("gene_data")).define("gene_data", ["select_meta","d3","gene_data_url"], function(select_meta,d3,gene_data_url)
{
  var gene_data
  
  if (['none', 'leiden'].includes(select_meta)){
    gene_data = ([{}])
  } else {
    gene_data = d3.csv(gene_data_url)
  }
  return gene_data
}
);
  main.variable(observer("cat_opacity")).define("cat_opacity", function(){return(
0.9
)});
  main.variable(observer("opacity_scale")).define("opacity_scale", ["d3","gene_max"], function(d3,gene_max){return(
d3.scaleLinear()
    .domain([0, gene_max])
    .range([0, 250])
)});
  main.variable(observer("gene_max")).define("gene_max", ["gene_data","select_meta"], function(gene_data,select_meta){return(
Math.max.apply(Math, gene_data.map(function(x) { return parseInt(x[select_meta]) })) * 0.90
)});
  main.variable(observer("ini_map_type")).define("ini_map_type", function(){return(
'UMAP'
)});
  main.variable(observer()).define(["map_type"], function(map_type){return(
map_type
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Cell Polygons`
)});
  main.variable(observer("requested_fovs")).define("requested_fovs", function(){return(
[30, 98, 99]
)});
  main.variable(observer("cell_poly_fovs")).define("cell_poly_fovs", ["fovs","available_fovs"], function(fovs,available_fovs){return(
fovs.filter(x => available_fovs.includes(x))
)});
  main.variable(observer("promised_cell_polygons")).define("promised_cell_polygons", ["cell_poly_fovs","map_type"], function(cell_poly_fovs,map_type){return(
Promise.all(cell_poly_fovs.map(fov => {
  const url = 'https://raw.githubusercontent.com/cornhundred/testing_something/master/cell_polygons/cells_' + fov + '.json'

  var cell_polygons
  if (map_type === 'Spatial'){
    cell_polygons = fetch(url)
      .then(response => response.json())
  } else {
    cell_polygons = []
  }

  return cell_polygons
}))
)});
  main.variable(observer("barcode_id_gene_url")).define("barcode_id_gene_url", function(){return(
'https://raw.githubusercontent.com/cornhundred/testing_something/master/barcode_id_gene_dictionary.json'
)});
  main.variable(observer("barcode_id_gene_dictionary")).define("barcode_id_gene_dictionary", ["barcode_id_gene_url"], function(barcode_id_gene_url){return(
fetch(barcode_id_gene_url)
  .then(d => d.json())
)});
  main.variable(observer("cell_polygons")).define("cell_polygons", ["promised_cell_polygons"], function(promised_cell_polygons){return(
[].concat.apply([], promised_cell_polygons)
)});
  main.variable(observer()).define(["cell_polygon_url"], async function(cell_polygon_url){return(
await fetch(cell_polygon_url)
)});
  main.variable(observer()).define(["cell_polygon_url"], function(cell_polygon_url){return(
fetch(cell_polygon_url)
)});
  main.variable(observer("cell_polygon_url")).define("cell_polygon_url", function(){return(
'https://raw.githubusercontent.com/cornhundred/testing_something/master/cell_polygons/cells_99.json'
)});
  main.variable(observer()).define(["cell_polygon_url"], async function(cell_polygon_url){return(
await fetch(cell_polygon_url)
)});
  main.variable(observer()).define(function(){return(
fetch('https://raw.githubusercontent.com/cornhundred/testing_something/master/cell_polygons/available_fovs_cell_polygons.csv')
     .then(d => d)
)});
  main.variable(observer("available_fovs_ini")).define("available_fovs_ini", ["d3"], function(d3){return(
d3.text('https://raw.githubusercontent.com/cornhundred/testing_something/master/cell_polygons/available_fovs_cell_polygons.csv')
)});
  main.variable(observer("available_fovs")).define("available_fovs", ["d3","available_fovs_ini"], function(d3,available_fovs_ini){return(
d3.csvParseRows(available_fovs_ini).map(x => parseInt(x[0]))
)});
  main.variable(observer("viewof map_type")).define("viewof map_type", ["html","d3","ini_map_type"], function(html,d3,ini_map_type)
{
  const element = html`
    <div style="display: inline-block; user-select: none;"></div>`;

  d3.select(element)
    .style('padding-right', '25px')  
    .selectAll('div')
    .data(['UMAP', 'Spatial'])
    .join('span')
    .on('click', function(d){
      d3.select(element).selectAll('span')
        .style('color', '#808080')
      d3.select(this)
        .style('color', 'blue') 
      element.value = d.replace(', ', '')
      element.dispatchEvent(new CustomEvent("input"));    
    })    
    .style('min-width', '200px')
    .style('max-width', '200px')    
    .style('margin-right', '10px')    
    .text(d => d)
    .style('font-weight', '550px') 
    .style("font-family", "sans-serif")
    .style("font-size", "16")
    .style("text-anchor", "end")
    .style('font-weight', 'bold')
    .style('color', d => d === 'UMAP' ?  'blue': '#808080')
    .attr('id', d => d)


  element.value = ini_map_type
  element.dispatchEvent(new CustomEvent("input"))

  return element
}
);
  main.variable(observer("map_type")).define("map_type", ["Generators", "viewof map_type"], (G, _) => G.input(_));
  const child2 = runtime.module(define1);
  main.import("select", child2);
  main.variable(observer("meta_data_cols")).define("meta_data_cols", ["meta_data_cols_ini","gene_names"], function(meta_data_cols_ini,gene_names){return(
meta_data_cols_ini.concat(gene_names)
)});
  main.variable(observer("non_param_cols")).define("non_param_cols", function(){return(
['x', 'y', 'umap-x', 'umap-y', 'name', 'fov']
)});
  main.variable(observer("meta_data_cols_ini")).define("meta_data_cols_ini", ["data","non_param_cols"], function(data,non_param_cols){return(
Object.keys(data[0])
                       .filter(x => non_param_cols.includes(x) === false)
)});
  main.variable(observer("gene_names")).define("gene_names", ["meta_gene"], function(meta_gene){return(
meta_gene.map(x => x['']).sort()
)});
  main.variable(observer("meta_gene")).define("meta_gene", ["meta_gene_ini"], function(meta_gene_ini){return(
meta_gene_ini
            .filter(x => x[''].includes('Blank') === false)
            .sort(function(a, b){
                return b['mean'] - a['mean'];
            })
)});
  main.variable(observer("meta_gene_url")).define("meta_gene_url", function(){return(
'https://raw.githubusercontent.com/cornhundred/testing_something/master/meta_gene.csv'
)});
  main.variable(observer("meta_gene_ini")).define("meta_gene_ini", ["d3","meta_gene_url"], function(d3,meta_gene_url){return(
d3.csv(meta_gene_url)
)});
  main.variable(observer()).define(["meta_gene_ini"], function(meta_gene_ini){return(
meta_gene_ini[0]
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}
