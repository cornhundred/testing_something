import define1 from "./e93997d5089d7165@2303.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Cell UMAP-Spatial Genes - Embed Final `
)});
  main.variable(observer("dashboard")).define("dashboard", ["html","viewof map_type","viewof select_meta_dropdown","container"], function(html,$0,$1,container){return(
html`
  <div id='dashboard'>
    <div style="display: flex;">
     <div style="margin-left: 15px; margin-right: -20px; border:1px; text-align:right;">${$0} </div>
     <div style="margin-right: 15px; border:1px; text-align:right;">${$1} </div>
    </div>
  
    <div>
      ${container}
    </div>
</div>
`
)});
  main.variable(observer("container")).define("container", ["html","height","width"], function(html,height,width){return(
html `

<div style="height:${height}px; width: ${width}px; border-style:solid; border-color:#d3d3d3; border-width:1px"></div>

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Map and Metadata Selection`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Metadata selection`
)});
  main.variable(observer("viewof select_meta_dropdown")).define("viewof select_meta_dropdown", ["select","meta_data_cols","ini_cat"], function(select,meta_data_cols,ini_cat){return(
select({'options':['none'].concat(meta_data_cols), value: ini_cat})
)});
  main.variable(observer("select_meta_dropdown")).define("select_meta_dropdown", ["Generators", "viewof select_meta_dropdown"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`Map Type`
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
  main.define("initial select_meta", ["select_meta_dropdown"], function(select_meta_dropdown){return(
select_meta_dropdown
)});
  main.variable(observer("mutable select_meta")).define("mutable select_meta", ["Mutable", "initial select_meta"], (M, _) => new M(_));
  main.variable(observer("select_meta")).define("select_meta", ["mutable select_meta"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`# Deck.gl`
)});
  main.variable(observer("autoHighlight")).define("autoHighlight", function(){return(
true
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
      inst_y = - d.y
    } else {
      inst_x = umap_x_scale(d['umap-x'])
      inst_y = - umap_y_scale(d['umap-y'])
    }
    return [inst_x, inst_y]
  }
)});
  main.variable(observer("scatterLayer")).define("scatterLayer", ["deck","data","apply_map_morph","select_meta","selected_leidens","d3","cat_colors","cat_opacity","opacity_scale","gene_data","radius","is_pickable","radius_min_pixels","map_type","transitions","mutable selected_leidens","mutable select_meta"], function(deck,data,apply_map_morph,select_meta,selected_leidens,d3,cat_colors,cat_opacity,opacity_scale,gene_data,radius,is_pickable,radius_min_pixels,map_type,transitions,$0,$1){return(
new deck.ScatterplotLayer({
      id: 'scatterLayer',
      data: data,
      getPosition: apply_map_morph,
      getFillColor: d => {
        var inst_color

        if (select_meta === 'none'){
          // show dim scatterplot
          inst_color = [50, 50, 50, 100]
        } else {

          // leiden or gene
          if (select_meta === 'leiden'){
            
            // color by leiden
            if (selected_leidens.length === 0){
              // show all leidens
              ////////////////////////////////////////
              var rgb = d3.color(cat_colors[d[select_meta]])
              inst_color = [rgb.r, rgb.g, rgb.b, 255 * cat_opacity]          
            } else {
              // show a subset of leidens
              if (selected_leidens.includes(d['leiden'])){
                var rgb = d3.color(cat_colors[d[select_meta]])
                inst_color = [rgb.r, rgb.g, rgb.b, 255 * cat_opacity]
              } else {
                inst_color = [50, 50, 50, 10]
              }              
            }
            
          } else {

            var inst_opacity = opacity_scale(parseInt(gene_data[d['name']][select_meta]))

            // color by gene value  
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
        getFillColor: [select_meta, selected_leidens],
        getPosition: map_type
      },    
      transitions: transitions,
      onClick: (info, event) => {
        
        if ($0.value[0] !== info.object.leiden){
          $1.value = 'leiden'
          $0.value = [info.object.leiden]
        } else {
          $1.value = 'leiden'
          $0.value = []
        }
      
      }      
  })
)});
  main.variable(observer()).define(["deckgl","scatterLayer"], function(deckgl,scatterLayer){return(
deckgl.setProps({layers: [scatterLayer]})
)});
  main.variable(observer("deckgl")).define("deckgl", ["deck","container","initial_view_state"], function(deck,container,initial_view_state)
{
  
  // // reference for below https://observablehq.com/@tomvantilburg/deckgl-mapbox-and-3d-tiles
  // // This is an Observable hack: clear previously generated content
  // container.innerHTML = '';
    
  const view = new deck.OrthographicView({id: 'ortho'})
  
  return new deck.DeckGL({
    container,
    views:[view],
    initialViewState:initial_view_state,
    controller: true,
    
    // getTooltip: ({object}) => {
    //   return object && 
    //     `cell: ${object.name}` 
    // },    

    // getTooltip: ({object}) => object && {
    //   html: `<h2>${object.name}</h2>`,
    //   style: {
    //     backgroundColor: '#D3D3D3',
    //     opacity: 0.8,
    //     fontSize: '0.8em'
    //   }
    // }  

    getTooltip: ({object}) => object && {
      html: `${object.tooltip_name}`,
      style: {
        fontSize: '0.8em',
        padding: '5px',
      }
    },    
    
  });
}
);
  main.variable(observer("deck")).define("deck", ["require"], function(require){return(
require.alias({
  // optional dependencies
  h3: {}
})('deck.gl@latest/dist.min.js')
)});
  main.variable(observer("initial_view_state")).define("initial_view_state", ["ini_x","ini_y","zoom","minZoom"], function(ini_x,ini_y,zoom,minZoom){return(
{
  target: [ini_x, -ini_y, 0],
  zoom: zoom,
  minZoom:minZoom,
  maxZoom:3
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Parameters`
)});
  main.variable(observer("is_pickable")).define("is_pickable", function(){return(
true
)});
  main.variable(observer("width")).define("width", function(){return(
'auto'
)});
  main.variable(observer("height")).define("height", function(){return(
750
)});
  main.variable(observer("minZoom")).define("minZoom", function(){return(
-3.75
)});
  main.variable(observer("radius_min_pixels")).define("radius_min_pixels", function(){return(
2.0
)});
  main.variable(observer("zoom")).define("zoom", function(){return(
-3.25
)});
  main.variable(observer("radius")).define("radius", function(){return(
7.5
)});
  main.variable(observer("ini_cat")).define("ini_cat", ["inputs"], function(inputs){return(
inputs['ini_cat']
)});
  main.variable(observer("ini_map_type")).define("ini_map_type", function(){return(
'UMAP'
)});
  main.variable(observer("transitionDuration")).define("transitionDuration", function(){return(
3000
)});
  main.variable(observer("cat_opacity")).define("cat_opacity", function(){return(
0.9
)});
  main.variable(observer("default_opacity")).define("default_opacity", function(){return(
0.5
)});
  main.variable(observer("meta_size_scale")).define("meta_size_scale", function(){return(
1.25
)});
  main.variable(observer("unselected_opacity_scale")).define("unselected_opacity_scale", function(){return(
0.25
)});
  main.variable(observer("non_param_cols")).define("non_param_cols", function(){return(
['x', 'y', 'umap-x', 'umap-y', 'name']
)});
  main.define("initial selected_leidens", function(){return(
[]
)});
  main.variable(observer("mutable selected_leidens")).define("mutable selected_leidens", ["Mutable", "initial selected_leidens"], (M, _) => new M(_));
  main.variable(observer("selected_leidens")).define("selected_leidens", ["mutable selected_leidens"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`### Parameters from Data`
)});
  main.variable(observer("x_min")).define("x_min", ["d3","data"], function(d3,data){return(
d3.min(data, d => d['x'])
)});
  main.variable(observer("x_max")).define("x_max", ["d3","data"], function(d3,data){return(
d3.max(data, d => d['x'])
)});
  main.variable(observer("y_min")).define("y_min", ["d3","data"], function(d3,data){return(
d3.min(data, d => d['y'])
)});
  main.variable(observer("y_max")).define("y_max", ["d3","data"], function(d3,data){return(
d3.max(data, d => d['y'])
)});
  main.variable(observer("umap_x_min")).define("umap_x_min", ["d3","data"], function(d3,data){return(
d3.min(data, d => d['umap-x'])
)});
  main.variable(observer("umap_x_max")).define("umap_x_max", ["d3","data"], function(d3,data){return(
d3.max(data, d => d['umap-x'])
)});
  main.variable(observer("umap_y_min")).define("umap_y_min", ["d3","data"], function(d3,data){return(
d3.min(data, d => d['umap-y'])
)});
  main.variable(observer("umap_y_max")).define("umap_y_max", ["d3","data"], function(d3,data){return(
d3.max(data, d => d['umap-y'])
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
  main.variable(observer("ini_x")).define("ini_x", ["d3","data"], function(d3,data){return(
d3.mean(data, d => +d.x)
)});
  main.variable(observer("ini_y")).define("ini_y", ["d3","data"], function(d3,data){return(
d3.mean(data, d => +d.y)
)});
  main.variable(observer("meta_data_cols_ini")).define("meta_data_cols_ini", ["data","non_param_cols"], function(data,non_param_cols){return(
Object.keys(data[0])
                       .filter(x => non_param_cols.includes(x) === false)
)});
  main.variable(observer("meta_data_cols")).define("meta_data_cols", ["meta_data_cols_ini","gene_names"], function(meta_data_cols_ini,gene_names){return(
meta_data_cols_ini.concat(gene_names)
)});
  main.variable(observer("gene_max")).define("gene_max", ["gene_data","select_meta"], function(gene_data,select_meta){return(
Math.max.apply(Math, gene_data.map(function(x) { return parseInt(x[select_meta]) })) * 0.85
)});
  main.variable(observer("cat_colors")).define("cat_colors", ["inputs"], function(inputs){return(
inputs['cat_colors']
)});
  main.variable(observer("opacity_scale")).define("opacity_scale", ["d3","gene_max"], function(d3,gene_max){return(
d3.scaleLinear()
    .domain([0, gene_max])
    .range([0, 250])
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Data`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Pre-loaded Data`
)});
  main.variable(observer("inputs")).define("inputs", ["jszip"], function(jszip){return(
fetch('https://raw.githubusercontent.com/cornhundred/testing_something/master/inputs.json.zip')
          .then(x => x.arrayBuffer())
          .then(x => jszip.loadAsync(x))
          .then(buf => {
            const file = Object.keys(buf.files)[0];
            const inst_obj = buf.file(file)
                                .async("string")
                                .then(x => JSON.parse(x))
            return inst_obj
          })
)});
  main.variable(observer("data")).define("data", ["inputs"], function(inputs){return(
inputs['data'].map(x => {
  x.tooltip_name = 'Leiden-' + x.leiden
  return x
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Fetched Data`
)});
  main.variable(observer("meta_gene_url")).define("meta_gene_url", function(){return(
'https://raw.githubusercontent.com/cornhundred/testing_something/master/meta_gene.csv'
)});
  main.variable(observer("meta_gene_ini")).define("meta_gene_ini", ["d3","meta_gene_url"], function(d3,meta_gene_url){return(
d3.csv(meta_gene_url)
)});
  main.variable(observer("meta_gene")).define("meta_gene", ["meta_gene_ini"], function(meta_gene_ini){return(
meta_gene_ini
            .filter(x => x[''].includes('Blank') === false)
            .sort(function(a, b){
                return b['mean'] - a['mean'];
            })
)});
  main.variable(observer("gene_names")).define("gene_names", ["meta_gene"], function(meta_gene){return(
meta_gene.map(x => x['']).sort()
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
  main.variable(observer()).define(["md"], function(md){return(
md`# Imports`
)});
  main.variable(observer("jszip")).define("jszip", ["require"], function(require){return(
require("jszip@3/dist/jszip.min.js")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  const child1 = runtime.module(define1);
  main.import("select", child1);
  return main;
}
