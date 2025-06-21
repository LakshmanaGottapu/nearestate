//import listings from "@/data/listings";
import React, { useState,useEffect } from 'react'
//import Pagination from '../../Pagination'
import FeaturedListings from './FeatuerdListings'
//import TopFilterBar from './TopFilterBar'
//import TopFilterBar2 from './TopFilterBar2'
import AdvanceFilterModal from '@/components/common/advance-filter-two'
import PaginationTwo from "../../PaginationTwo";
//import ListingMap1 from "../ListingMap1";
import axios from "axios";
import {useNavigate,useLocation} from 'react-router-dom';
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { Link } from "react-router-dom";

export default function PropertyFilteringThree() {
    const navigate = useNavigate();
    const mylocation = useLocation();
    const queryParams = new URLSearchParams(mylocation.search);
    const [markers, setMarkers] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [currentSortingOption, setCurrentSortingOption] = useState('Newest')

    const [sortedFilteredData, setSortedFilteredData] = useState([]);

    const [pageNumber, setPageNumber] = useState(1)
    const [colstyle, setColstyle] = useState(true)
    const [pageItems, setPageItems] = useState([])
    const [pageContentTrac, setPageContentTrac] = useState([])
    const [pageData,setPagedata]=useState([]);
    const [openwindow,setOpenwindow]=useState(true);
    const [Map,setMap]=useState();
    //const [realViewprop, setRealViewprop]=useState();
    // useEffect(() => {
    //   setPageItems(sortedFilteredData
    //     .slice((pageNumber - 1) * 4, pageNumber * 4))
    //     setPageContentTrac([((pageNumber - 1) * 4) + 1 ,pageNumber * 4,sortedFilteredData.length])
    // }, [pageNumber,sortedFilteredData])
    
    const [listingStatus, setListingStatus] = useState('All')
    const [propertyTypes, setPropertyTypes] = useState([])
    const [priceRange, setPriceRange] = useState([0,100000])
    const [bedrooms, setBedrooms] = useState(0)
    const [bathroms, setBathroms] = useState(0)
    const [location, setLocation] = useState('All Cities')
     const [squirefeet, setSquirefeet] = useState([])
    const [yearBuild, setyearBuild] = useState([])
    const [categories, setCategories] = useState([])
    const [width, setWidth] = useState(window.innerWidth);
    const isMobile = width <= 768;
    const unitsIcon="<span style='display:inline-block;position:relative;margin-left:-3px;'><svg width='12' height='12' viewBox='0 0 12 12' style='margin-top:-2px;' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M9 0.75H3C2.58579 0.75 2.25 1.08579 2.25 1.5V10.5C2.25 10.9142 2.58579 11.25 3 11.25H9C9.41421 11.25 9.75 10.9142 9.75 10.5V1.5C9.75 1.08579 9.41421 0.75 9 0.75ZM4.125 2.8125C4.125 2.70895 4.20895 2.625 4.3125 2.625H5.4375C5.54105 2.625 5.625 2.70895 5.625 2.8125V3.9375C5.625 4.04105 5.54105 4.125 5.4375 4.125H4.3125C4.20895 4.125 4.125 4.04105 4.125 3.9375V2.8125ZM4.125 6.1875V5.0625C4.125 4.95895 4.20895 4.875 4.3125 4.875H5.4375C5.54105 4.875 5.625 4.95895 5.625 5.0625V6.1875C5.625 6.29105 5.54105 6.375 5.4375 6.375H4.3125C4.20895 6.375 4.125 6.29105 4.125 6.1875ZM7.125 10.5H4.875V8.0625C4.875 7.95894 4.95895 7.875 5.0625 7.875H6.9375C7.04105 7.875 7.125 7.95894 7.125 8.0625V10.5ZM7.875 6.1875C7.875 6.29105 7.79105 6.375 7.6875 6.375H6.5625C6.45895 6.375 6.375 6.29105 6.375 6.1875V5.0625C6.375 4.95895 6.45895 4.875 6.5625 4.875H7.6875C7.79105 4.875 7.875 4.95895 7.875 5.0625V6.1875ZM7.875 3.9375C7.875 4.04105 7.79105 4.125 7.6875 4.125H6.5625C6.45895 4.125 6.375 4.04105 6.375 3.9375V2.8125C6.375 2.70895 6.45895 2.625 6.5625 2.625H7.6875C7.79105 2.625 7.875 2.70895 7.875 2.8125V3.9375Z' fill='white'></path></svg></span>";
    const resetFilter = ()=>{
      setListingStatus('All')
      setPropertyTypes([])
      setPriceRange([0,100000])
      setBedrooms(0)
      setBathroms(0)
      setLocation('All Cities')
      setSquirefeet([])
      setyearBuild([0,2050])
      setCategories([])
      setCurrentSortingOption('Newest')
     document.querySelectorAll(".filterInput").forEach(function(element) {
      element.value = null;
  });

     document.querySelectorAll(".filterSelect").forEach(function(element) {
      element.value = 'All Cities';
  });
  


    }
    const [searchQuery, setSearchQuery] = useState('')

    const handlelistingStatus =(elm)=>{
      setListingStatus(pre => pre == elm ? 'All':elm)


    }

    
    
    const handlepropertyTypes =(elm)=>{


      if (elm == 'All') {
        setPropertyTypes([])
        
      } else {
        setPropertyTypes(pre=>pre.includes(elm) ? [...pre.filter((el)=>el!=elm)] : [...pre,elm])
      }
    

    }
    const handlepriceRange =(elm)=>{
      setPriceRange(elm)

    }
    const handlebedrooms =(elm)=>{
      setBedrooms(elm)
    }
    const handlebathroms =(elm)=>{
      setBathroms(elm)
    }
    const handlelocation =(elm)=>{
      console.log(elm)
      setLocation(elm)
    }
    const handlesquirefeet =(elm)=>{
      setSquirefeet(elm)
    }
    const handleyearBuild =(elm)=>{
      setyearBuild(elm)
    }
    const handlecategories =(elm)=>{
      if (elm == 'All') {
        setCategories([])
        
      } else {
        setCategories(pre=>pre.includes(elm) ? [...pre.filter((el)=>el!=elm)] : [...pre,elm])
      }

    }

    // var center;
    // function MarkerClusterer(map, opt_markers, opt_options) {
    //     center=opt_markers[0];
    //     // MarkerClusterer implements google.maps.OverlayView interface. We use the
    //     // extend function to extend MarkerClusterer with google.maps.OverlayView
    //     // because it might not always be available when the code is defined so we
    //     // look for it at the last possible moment. If it doesn't exist now then
    //     // there is no point going ahead :)
    //     this.extend(MarkerClusterer, google.maps.OverlayView);
    //     this.map_ = map;
    
    //     /**
    //      * @type {Array.<google.maps.Marker>}
    //      * @private
    //      */
    //     this.markers_ = [];
    
    //     /**
    //      *  @type {Array.<Cluster>}
    //      */
    //     this.clusters_ = [];
    
    //     this.sizes = [53, 56, 66, 78, 90];
    
    //     /**
    //      * @private
    //      */
    //     this.styles_ = [];
    
    //     /**
    //      * @type {boolean}
    //      * @private
    //      */
    //     this.ready_ = false;
    
    //     var options = opt_options || {};
    
    //     /**
    //      * @type {number}
    //      * @private
    //      */
    //     this.gridSize_ = options['gridSize'] || 60;
    
    //     /**
    //      * @private
    //      */
    //     this.minClusterSize_ = options['minimumClusterSize'] || 2;
    
    
    //     /**
    //      * @type {?number}
    //      * @private
    //      */
    //     this.maxZoom_ = options['maxZoom'] || null;
    
    //     this.styles_ = options['styles'] || [];
    
    //     /**
    //      * @type {string}
    //      * @private
    //      */
    //     this.imagePath_ = options['imagePath'] ||
    //         this.MARKER_CLUSTER_IMAGE_PATH_;
    
    //     /**
    //      * @type {string}
    //      * @private
    //      */
    //     this.imageExtension_ = options['imageExtension'] ||
    //         this.MARKER_CLUSTER_IMAGE_EXTENSION_;
    
    //     /**
    //      * @type {boolean}
    //      * @private
    //      */
    //     this.zoomOnClick_ = true;
    
    //     if (options['zoomOnClick'] != undefined) {
    //         this.zoomOnClick_ = options['zoomOnClick'];
    //     }
    
    //     /**
    //      * @type {boolean}
    //      * @private
    //      */
    //     this.averageCenter_ = false;
    
    //     if (options['averageCenter'] != undefined) {
    //         this.averageCenter_ = options['averageCenter'];
    //     }
    
    //     this.setupStyles_();
    
    //     this.setMap(map);
    
    //     /**
    //      * @type {number}
    //      * @private
    //      */
    //     this.prevZoom_ = this.map_.getZoom();
    
    //     // Add the map event listeners
    //     var that = this;
    //     google.maps.event.addListener(this.map_, 'zoom_changed', function() {
    //         // Determines map type and prevent illegal zoom levels
    //         var zoom = that.map_.getZoom();
    //         var minZoom = that.map_.minZoom || 0;
    //         var maxZoom = Math.min(that.map_.maxZoom || 100,
    //             that.map_.mapTypes[that.map_.getMapTypeId()].maxZoom);
    //         zoom = Math.min(Math.max(zoom, minZoom), maxZoom);
    
    //         if (that.prevZoom_ != zoom) {
    //             that.prevZoom_ = zoom;
    //             that.resetViewport();
    //         }
    //     });
    
    //     google.maps.event.addListener(this.map_, 'idle', function() {
    //         that.redraw();
    //     });
    
    //     // Finally, add the markers
    //     if (opt_markers && (opt_markers.length || Object.keys(opt_markers).length)) {
    //         this.addMarkers(opt_markers, false);
    //     }
    // }
    
    
    // /**
    //  * The marker cluster image path.
    //  *
    //  * @type {string}
    //  * @private
    //  */
    // MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = '../images/m';
    
    
    // /**
    //  * The marker cluster image path.
    //  *
    //  * @type {string}
    //  * @private
    //  */
    // MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = 'png';
    
    
    // /**
    //  * Extends a objects prototype by anothers.
    //  *
    //  * @param {Object} obj1 The object to be extended.
    //  * @param {Object} obj2 The object to extend with.
    //  * @return {Object} The new extended object.
    //  * @ignore
    //  */
    // MarkerClusterer.prototype.extend = function(obj1, obj2) {
    //     return (function(object) {
    //         for (var property in object.prototype) {
    //             this.prototype[property] = object.prototype[property];
    //         }
    //         return this;
    //     }).apply(obj1, [obj2]);
    // };
    
    
    // /**
    //  * Implementaion of the interface method.
    //  * @ignore
    //  */
    // MarkerClusterer.prototype.onAdd = function() {
    //     this.setReady_(true);
    // };
    
    // /**
    //  * Implementaion of the interface method.
    //  * @ignore
    //  */
    // MarkerClusterer.prototype.draw = function() {};
    
    // /**
    //  * Sets up the styles object.
    //  *
    //  * @private
    //  */
    // MarkerClusterer.prototype.setupStyles_ = function() {
    //     if (this.styles_.length) {
    //         return;
    //     }
    
    //     for (var i = 0, size; size = this.sizes[i]; i++) {
    //         this.styles_.push({
    //             url: this.imagePath_ + (i + 1) + '.' + this.imageExtension_,
    //             height: size,
    //             width: size
    //         });
    //     }
    // };
    
    // /**
    //  *  Fit the map to the bounds of the markers in the clusterer.
    //  */
    // MarkerClusterer.prototype.fitMapToMarkers = function() {
    //     var markers = this.getMarkers();
    //     var bounds = new google.maps.LatLngBounds();
    //     for (var i = 0, marker; marker = markers[i]; i++) {
    //         bounds.extend(marker.getPosition());
    //     }
    
    //     this.map_.fitBounds(bounds);
    // };
    
    
    // /**
    //  *  Sets the styles.
    //  *
    //  *  @param {Object} styles The style to set.
    //  */
    // MarkerClusterer.prototype.setStyles = function(styles) {
    //     this.styles_ = styles;
    // };
    
    
    // /**
    //  *  Gets the styles.
    //  *
    //  *  @return {Object} The styles object.
    //  */
    // MarkerClusterer.prototype.getStyles = function() {
    //     return this.styles_;
    // };
    
    
    // /**
    //  * Whether zoom on click is set.
    //  *
    //  * @return {boolean} True if zoomOnClick_ is set.
    //  */
    // MarkerClusterer.prototype.isZoomOnClick = function() {
    //     return this.zoomOnClick_;
    // };
    
    // /**
    //  * Whether average center is set.
    //  *
    //  * @return {boolean} True if averageCenter_ is set.
    //  */
    // MarkerClusterer.prototype.isAverageCenter = function() {
    //     return this.averageCenter_;
    // };
    
    
    // /**
    //  *  Returns the array of markers in the clusterer.
    //  *
    //  *  @return {Array.<google.maps.Marker>} The markers.
    //  */
    // MarkerClusterer.prototype.getMarkers = function() {
    //     return this.markers_;
    // };
    
    
    // /**
    //  *  Returns the number of markers in the clusterer
    //  *
    //  *  @return {Number} The number of markers.
    //  */
    // MarkerClusterer.prototype.getTotalMarkers = function() {
    //     return this.markers_.length;
    // };
    
    
    // /**
    //  *  Sets the max zoom for the clusterer.
    //  *
    //  *  @param {number} maxZoom The max zoom level.
    //  */
    // MarkerClusterer.prototype.setMaxZoom = function(maxZoom) {
    //     this.maxZoom_ = maxZoom;
    // };
    
    
    // /**
    //  *  Gets the max zoom for the clusterer.
    //  *
    //  *  @return {number} The max zoom level.
    //  */
    // MarkerClusterer.prototype.getMaxZoom = function() {
    //     return this.maxZoom_;
    // };
    
    
    // /**
    //  *  The function for calculating the cluster icon image.
    //  *
    //  *  @param {Array.<google.maps.Marker>} markers The markers in the clusterer.
    //  *  @param {number} numStyles The number of styles available.
    //  *  @return {Object} A object properties: 'text' (string) and 'index' (number).
    //  *  @private
    //  */
    // MarkerClusterer.prototype.calculator_ = function(markers, numStyles) {
    //     var index = 0;
    //     var count = markers.length;
    //     var dv = count;
    //     while (dv !== 0) {
    //         dv = parseInt(dv / 10, 10);
    //         index++;
    //     }
    //     var price = 0;
    //     for (var i = 0; i < markers.length; i++) {
    //         price += Number(markers[i].dataPrice);
    //     }
    //     price = Math.floor(price/count);
        
    //     index = Math.min(index, numStyles);
    //     return {
    //        // text: count + ' 筆<br/>A. NT' + price,
    //       text:"<span class='cluster-visible'>"+count+"</span>",
    //         index: index
    //     };
    // };
    
    
    // /**
    //  * Set the calculator function.
    //  *
    //  * @param {function(Array, number)} calculator The function to set as the
    //  *     calculator. The function should return a object properties:
    //  *     'text' (string) and 'index' (number).
    //  *
    //  */
    // MarkerClusterer.prototype.setCalculator = function(calculator) {
    //     this.calculator_ = calculator;
    // };
    
    
    // /**
    //  * Get the calculator function.
    //  *
    //  * @return {function(Array, number)} the calculator function.
    //  */
    // MarkerClusterer.prototype.getCalculator = function() {
    //     return this.calculator_;
    // };
    
    
    // /**
    //  * Add an array of markers to the clusterer.
    //  *
    //  * @param {Array.<google.maps.Marker>} markers The markers to add.
    //  * @param {boolean=} opt_nodraw Whether to redraw the clusters.
    //  */
    // MarkerClusterer.prototype.addMarkers = function(markers, opt_nodraw) {
    //     if (markers.length) {
    //         for (var i = 0, marker; marker = markers[i]; i++) {
    //             this.pushMarkerTo_(marker);
    //         }
    //     } else if (Object.keys(markers).length) {
    //         for (var marker in markers) {
    //             this.pushMarkerTo_(markers[marker]);
    //         }
    //     }
    //     if (!opt_nodraw) {
    //         this.redraw();
    //     }
    // };
    
    
    // /**
    //  * Pushes a marker to the clusterer.
    //  *
    //  * @param {google.maps.Marker} marker The marker to add.
    //  * @private
    //  */
    // MarkerClusterer.prototype.pushMarkerTo_ = function(marker) {
    //     marker.isAdded = false;
    //     if (marker['draggable']) {
    //         // If the marker is draggable add a listener so we update the clusters on
    //         // the drag end.
    //         var that = this;
    //         google.maps.event.addListener(marker, 'dragend', function() {
    //             marker.isAdded = false;
    //             that.repaint();
    //         });
    //     }
    //     this.markers_.push(marker);
    // };
    
    
    // /**
    //  * Adds a marker to the clusterer and redraws if needed.
    //  *
    //  * @param {google.maps.Marker} marker The marker to add.
    //  * @param {boolean=} opt_nodraw Whether to redraw the clusters.
    //  */
    // MarkerClusterer.prototype.addMarker = function(marker, opt_nodraw) {
    //     this.pushMarkerTo_(marker);
    //     if (!opt_nodraw) {
    //         this.redraw();
    //     }
    // };
    
    
    // /**
    //  * Removes a marker and returns true if removed, false if not
    //  *
    //  * @param {google.maps.Marker} marker The marker to remove
    //  * @return {boolean} Whether the marker was removed or not
    //  * @private
    //  */
    // MarkerClusterer.prototype.removeMarker_ = function(marker) {
    //     var index = -1;
    //     if (this.markers_.indexOf) {
    //         index = this.markers_.indexOf(marker);
    //     } else {
    //         for (var i = 0, m; m = this.markers_[i]; i++) {
    //             if (m == marker) {
    //                 index = i;
    //                 break;
    //             }
    //         }
    //     }
    
    //     if (index == -1) {
    //         // Marker is not in our list of markers.
    //         return false;
    //     }
    
    //     marker.setMap(null);
    
    //     this.markers_.splice(index, 1);
    
    //     return true;
    // };
    
    
    // /**
    //  * Remove a marker from the cluster.
    //  *
    //  * @param {google.maps.Marker} marker The marker to remove.
    //  * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
    //  * @return {boolean} True if the marker was removed.
    //  */
    // MarkerClusterer.prototype.removeMarker = function(marker, opt_nodraw) {
    //     var removed = this.removeMarker_(marker);
    
    //     if (!opt_nodraw && removed) {
    //         this.resetViewport();
    //         this.redraw();
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };
    
    
    // /**
    //  * Removes an array of markers from the cluster.
    //  *
    //  * @param {Array.<google.maps.Marker>} markers The markers to remove.
    //  * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
    //  */
    // MarkerClusterer.prototype.removeMarkers = function(markers, opt_nodraw) {
    //     // create a local copy of markers if required
    //     // (removeMarker_ modifies the getMarkers() array in place)
    //     var markersCopy = markers === this.getMarkers() ? markers.slice() : markers;
    //     var removed = false;
    
    //     for (var i = 0, marker; marker = markersCopy[i]; i++) {
    //         var r = this.removeMarker_(marker);
    //         removed = removed || r;
    //     }
    
    //     if (!opt_nodraw && removed) {
    //         this.resetViewport();
    //         this.redraw();
    //         return true;
    //     }
    // };
    
    
    // /**
    //  * Sets the clusterer's ready state.
    //  *
    //  * @param {boolean} ready The state.
    //  * @private
    //  */
    // MarkerClusterer.prototype.setReady_ = function(ready) {
    //     if (!this.ready_) {
    //         this.ready_ = ready;
    //         this.createClusters_();
    //     }
    // };
    
    
    // /**
    //  * Returns the number of clusters in the clusterer.
    //  *
    //  * @return {number} The number of clusters.
    //  */
    // MarkerClusterer.prototype.getTotalClusters = function() {
    //     return this.clusters_.length;
    // };
    
    
    // /**
    //  * Returns the google map that the clusterer is associated with.
    //  *
    //  * @return {google.maps.Map} The map.
    //  */
    // MarkerClusterer.prototype.getMap = function() {
    //     return this.map_;
    // };
    
    
    // /**
    //  * Sets the google map that the clusterer is associated with.
    //  *
    //  * @param {google.maps.Map} map The map.
    //  */
    // MarkerClusterer.prototype.setMap = function(map) {
    //     this.map_ = map;
    // };
    
    
    // /**
    //  * Returns the size of the grid.
    //  *
    //  * @return {number} The grid size.
    //  */
    // MarkerClusterer.prototype.getGridSize = function() {
    //     return this.gridSize_;
    // };
    
    
    // /**
    //  * Sets the size of the grid.
    //  *
    //  * @param {number} size The grid size.
    //  */
    // MarkerClusterer.prototype.setGridSize = function(size) {
    //     this.gridSize_ = size;
    // };
    
    
    // /**
    //  * Returns the min cluster size.
    //  *
    //  * @return {number} The grid size.
    //  */
    // MarkerClusterer.prototype.getMinClusterSize = function() {
    //     return this.minClusterSize_;
    // };
    
    // /**
    //  * Sets the min cluster size.
    //  *
    //  * @param {number} size The grid size.
    //  */
    // MarkerClusterer.prototype.setMinClusterSize = function(size) {
    //     this.minClusterSize_ = size;
    // };
    
    
    // /**
    //  * Extends a bounds object by the grid size.
    //  *
    //  * @param {google.maps.LatLngBounds} bounds The bounds to extend.
    //  * @return {google.maps.LatLngBounds} The extended bounds.
    //  */
    // MarkerClusterer.prototype.getExtendedBounds = function(bounds) {
    //     var projection = this.getProjection();
    
    //     // Turn the bounds into latlng.
    //     var tr = new google.maps.LatLng(bounds.getNorthEast().lat(),
    //         bounds.getNorthEast().lng());
    //     var bl = new google.maps.LatLng(bounds.getSouthWest().lat(),
    //         bounds.getSouthWest().lng());
    
    //     // Convert the points to pixels and the extend out by the grid size.
    //     var trPix = projection.fromLatLngToDivPixel(tr);
    //     trPix.x += this.gridSize_;
    //     trPix.y -= this.gridSize_;
    
    //     var blPix = projection.fromLatLngToDivPixel(bl);
    //     blPix.x -= this.gridSize_;
    //     blPix.y += this.gridSize_;
    
    //     // Convert the pixel points back to LatLng
    //     var ne = projection.fromDivPixelToLatLng(trPix);
    //     var sw = projection.fromDivPixelToLatLng(blPix);
    
    //     // Extend the bounds to contain the new bounds.
    //     bounds.extend(ne);
    //     bounds.extend(sw);
    
    //     return bounds;
    // };
    
    
    // /**
    //  * Determins if a marker is contained in a bounds.
    //  *
    //  * @param {google.maps.Marker} marker The marker to check.
    //  * @param {google.maps.LatLngBounds} bounds The bounds to check against.
    //  * @return {boolean} True if the marker is in the bounds.
    //  * @private
    //  */
    // MarkerClusterer.prototype.isMarkerInBounds_ = function(marker, bounds) {
    //     return bounds.contains(marker.getPosition());
    // };
    
    
    // /**
    //  * Clears all clusters and markers from the clusterer.
    //  */
    // MarkerClusterer.prototype.clearMarkers = function() {
    //     this.resetViewport(true);
    
    //     // Set the markers a empty array.
    //     this.markers_ = [];
    // };
    
    
    // /**
    //  * Clears all existing clusters and recreates them.
    //  * @param {boolean} opt_hide To also hide the marker.
    //  */
    // MarkerClusterer.prototype.resetViewport = function(opt_hide) {
    //     // Remove all the clusters
    //     for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
    //         cluster.remove();
    //     }
    
    //     // Reset the markers to not be added and to be invisible.
    //     for (var i = 0, marker; marker = this.markers_[i]; i++) {
    //         marker.isAdded = false;
    //         if (opt_hide) {
    //             marker.setMap(null);
    //         }
    //     }
    
    //     this.clusters_ = [];
    // };
    
    // /**
    //  *
    //  */
    // MarkerClusterer.prototype.repaint = function() {
    //     var oldClusters = this.clusters_.slice();
    //     this.clusters_.length = 0;
    //     this.resetViewport();
    //     this.redraw();
    
    //     // Remove the old clusters.
    //     // Do it in a timeout so the other clusters have been drawn first.
    //     window.setTimeout(function() {
    //         for (var i = 0, cluster; cluster = oldClusters[i]; i++) {
    //             cluster.remove();
    //         }
    //     }, 0);
    // };
    
    
    // /**
    //  * Redraws the clusters.
    //  */
    // MarkerClusterer.prototype.redraw = function() {
    //     this.createClusters_();
    // };
    
    
    // /**
    //  * Calculates the distance between two latlng locations in km.
    //  * @see http://www.movable-type.co.uk/scripts/latlong.html
    //  *
    //  * @param {google.maps.LatLng} p1 The first lat lng point.
    //  * @param {google.maps.LatLng} p2 The second lat lng point.
    //  * @return {number} The distance between the two points in km.
    //  * @private
    //  */
    // MarkerClusterer.prototype.distanceBetweenPoints_ = function(p1, p2) {
    //     if (!p1 || !p2) {
    //         return 0;
    //     }
    
    //     var R = 6371; // Radius of the Earth in km
    //     var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
    //     var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
    //     var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //         Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
    //         Math.sin(dLon / 2) * Math.sin(dLon / 2);
    //     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //     var d = R * c;
    //     return d;
    // };
    
    
    // /**
    //  * Add a marker to a cluster, or creates a new cluster.
    //  *
    //  * @param {google.maps.Marker} marker The marker to add.
    //  * @private
    //  */
    // MarkerClusterer.prototype.addToClosestCluster_ = function(marker) {
    //     var distance = 40000; // Some large number
    //     var clusterToAddTo = null;
    //     var pos = marker.getPosition();
    //     for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
    //         var center = cluster.getCenter();
    //         if (center) {
    //             var d = this.distanceBetweenPoints_(center, marker.getPosition());
    //             if (d < distance) {
    //                 distance = d;
    //                 clusterToAddTo = cluster;
    //             }
    //         }
    //     }
    
    //     if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
    //         clusterToAddTo.addMarker(marker);
    //     } else {
    //         var cluster = new Cluster(this);
    //         cluster.addMarker(marker);
    //         this.clusters_.push(cluster);
    //     }
    // };
    
    
    // /**
    //  * Creates the clusters.
    //  *
    //  * @private
    //  */
    // MarkerClusterer.prototype.createClusters_ = function() {
    //     if (!this.ready_) {
    //         return;
    //     }
    
    //     // Get our current map view bounds.
    //     // Create a new bounds object so we don't affect the map.
    //     var mapBounds = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(),
    //         this.map_.getBounds().getNorthEast());
    //     var bounds = this.getExtendedBounds(mapBounds);
    
    //     for (var i = 0, marker; marker = this.markers_[i]; i++) {
    //         if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
    //             this.addToClosestCluster_(marker);
    //         }
    //     }
    // };
    
    
    // /**
    //  * A cluster that contains markers.
    //  *
    //  * @param {MarkerClusterer} markerClusterer The markerclusterer that this
    //  *     cluster is associated with.
    //  * @constructor
    //  * @ignore
    //  */
    // function Cluster(markerClusterer) {
    //     this.markerClusterer_ = markerClusterer;
    //     this.map_ = markerClusterer.getMap();
    //     this.gridSize_ = markerClusterer.getGridSize();
    //     this.minClusterSize_ = markerClusterer.getMinClusterSize();
    //     this.averageCenter_ = markerClusterer.isAverageCenter();
    //     this.center_ = null;
    //     this.markers_ = [];
    //     this.bounds_ = null;
    //     this.clusterIcon_ = new ClusterIcon(this, markerClusterer.getStyles(),
    //         markerClusterer.getGridSize());
    // }
    
    // /**
    //  * Determins if a marker is already added to the cluster.
    //  *
    //  * @param {google.maps.Marker} marker The marker to check.
    //  * @return {boolean} True if the marker is already added.
    //  */
    // Cluster.prototype.isMarkerAlreadyAdded = function(marker) {
    //     if (this.markers_.indexOf) {
    //         return this.markers_.indexOf(marker) != -1;
    //     } else {
    //         for (var i = 0, m; m = this.markers_[i]; i++) {
    //             if (m == marker) {
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // };
    
    
    // /**
    //  * Add a marker the cluster.
    //  *
    //  * @param {google.maps.Marker} marker The marker to add.
    //  * @return {boolean} True if the marker was added.
    //  */
    // Cluster.prototype.addMarker = function(marker) {
    //     if (this.isMarkerAlreadyAdded(marker)) {
    //         return false;
    //     }
    
    //     if (!this.center_) {
    //         this.center_ = marker.getPosition();
    //         this.calculateBounds_();
    //     } else {
    //         if (this.averageCenter_) {
    //             var l = this.markers_.length + 1;
    //             var lat = (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
    //             var lng = (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
    //             this.center_ = new google.maps.LatLng(lat, lng);
    //             this.calculateBounds_();
    //         }
    //     }
    
    //     marker.isAdded = true;
    //     this.markers_.push(marker);
    
    //     var len = this.markers_.length;
    //     if (len < this.minClusterSize_ && marker.getMap() != this.map_) {
    //         // Min cluster size not reached so show the marker.
    //         marker.setMap(this.map_);
    //     }
    
    //     if (len == this.minClusterSize_) {
    //         // Hide the markers that were showing.
    //         for (var i = 0; i < len; i++) {
    //             this.markers_[i].setMap(null);
    //         }
    //     }
    
    //     if (len >= this.minClusterSize_) {
    //         marker.setMap(null);
    //     }
    
    //     this.updateIcon();
    //     return true;
    // };
    
    
    // /**
    //  * Returns the marker clusterer that the cluster is associated with.
    //  *
    //  * @return {MarkerClusterer} The associated marker clusterer.
    //  */
    // Cluster.prototype.getMarkerClusterer = function() {
    //     return this.markerClusterer_;
    // };
    
    
    // /**
    //  * Returns the bounds of the cluster.
    //  *
    //  * @return {google.maps.LatLngBounds} the cluster bounds.
    //  */
    // Cluster.prototype.getBounds = function() {
    //     var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    //     var markers = this.getMarkers();
    //     if(markers){
    //         for (var i = 0, marker; marker = markers[i]; i++) {
    //         bounds.extend(marker.getPosition());
    //     }
    //     return bounds;
    //     }
    // };
    
    
    // /**
    //  * Removes the cluster
    //  */
    // Cluster.prototype.remove = function() {
    //     this.clusterIcon_.remove();
    //     this.markers_.length = 0;
    //     delete this.markers_;
    // };
    
    
    // /**
    //  * Returns the number of markers in the cluster.
    //  *
    //  * @return {number} The number of markers in the cluster.
    //  */
    // Cluster.prototype.getSize = function() {
    //     return this.markers_.length;
    // };
    
    
    // /**
    //  * Returns a list of the markers in the cluster.
    //  *
    //  * @return {Array.<google.maps.Marker>} The markers in the cluster.
    //  */
    // Cluster.prototype.getMarkers = function() {
    //     return this.markers_;
    // };
    
    
    // /**
    //  * Returns the center of the cluster.
    //  *
    //  * @return {google.maps.LatLng} The cluster center.
    //  */
    // Cluster.prototype.getCenter = function() {
    //     return this.center_;
    // };
    
    
    // /**
    //  * Calculated the extended bounds of the cluster with the grid.
    //  *
    //  * @private
    //  */
    // Cluster.prototype.calculateBounds_ = function() {
    //     var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    //     this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
    // };
    
    
    // /**
    //  * Determines if a marker lies in the clusters bounds.
    //  *
    //  * @param {google.maps.Marker} marker The marker to check.
    //  * @return {boolean} True if the marker lies in the bounds.
    //  */
    // Cluster.prototype.isMarkerInClusterBounds = function(marker) {
    //     return this.bounds_.contains(marker.getPosition());
    // };
    
    
    // /**
    //  * Returns the map that the cluster is associated with.
    //  *
    //  * @return {google.maps.Map} The map.
    //  */
    // Cluster.prototype.getMap = function() {
    //     return this.map_;
    // };
    
    
    // /**
    //  * Updates the cluster icon
    //  */
    // Cluster.prototype.updateIcon = function() {
    //     var zoom = this.map_.getZoom();
    //     var mz = this.markerClusterer_.getMaxZoom();
    
    //     if (mz && zoom > mz) {
    //         // The zoom is greater than our max zoom so show all the markers in cluster.
    //         for (var i = 0, marker; marker = this.markers_[i]; i++) {
    //             marker.setMap(this.map_);
    //         }
    //         return;
    //     }
    
    //     if (this.markers_.length < this.minClusterSize_) {
    //         // Min cluster size not yet reached.
    //         this.clusterIcon_.hide();
    //         return;
    //     }
    
    //     var numStyles = this.markerClusterer_.getStyles().length;
    //     var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
    //     this.clusterIcon_.setCenter(this.center_);
    //     this.clusterIcon_.setSums(sums);
    //     this.clusterIcon_.show();
    // };
    
    
    // /**
    //  * A cluster icon
    //  *
    //  * @param {Cluster} cluster The cluster to be associated with.
    //  * @param {Object} styles An object that has style properties:
    //  *     'url': (string) The image url.
    //  *     'height': (number) The image height.
    //  *     'width': (number) The image width.
    //  *     'anchor': (Array) The anchor position of the label text.
    //  *     'textColor': (string) The text color.
    //  *     'textSize': (number) The text size.
    //  *     'backgroundPosition: (string) The background postition x, y.
    //  * @param {number=} opt_padding Optional padding to apply to the cluster icon.
    //  * @constructor
    //  * @extends google.maps.OverlayView
    //  * @ignore
    //  */
    // function ClusterIcon(cluster, styles, opt_padding) {
    //     cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);
    
    //     this.styles_ = styles;
    //     this.padding_ = opt_padding || 0;
    //     this.cluster_ = cluster;
    //     this.center_ = null;
    //     this.map_ = cluster.getMap();
    //     this.div_ = null;
    //     this.sums_ = null;
    //     this.visible_ = false;
    
    //     this.setMap(this.map_);
    // }
    
    
    // /**
    //  * Triggers the clusterclick event and zoom's if the option is set.
    //  */
    // ClusterIcon.prototype.triggerClusterClick = function() {
    //     var markerClusterer = this.cluster_.getMarkerClusterer();
    
    //     // Trigger the clusterclick event.
    //     google.maps.event.trigger(markerClusterer.map_, 'clusterclick', this.cluster_);
    
    //     if (markerClusterer.isZoomOnClick()) {
    //         // Zoom into the cluster.
    //         let zlevel=this.map_.getZoom();
    //         var zoomLevel=zlevel+1;
    //         if(zlevel<12){ zoomLevel=14; }
    //         this.map_.setCenter(center.position);
    //         this.map_.setZoom(zoomLevel);
    //         //this.map_.fitBounds(this.cluster_.getBounds());
    //     }
    // };
    
    
    // /**
    //  * Adding the cluster icon to the dom.
    //  * @ignore
    //  */
    // ClusterIcon.prototype.onAdd = function() {
    //     this.div_ = document.createElement('DIV');
    //     if (this.visible_) {
    //         var pos = this.getPosFromLatLng_(this.center_);
    //         this.div_.style.cssText = this.createCss(pos);
    //         this.div_.innerHTML = this.sums_.text;
    //     }
    
    //     var panes = this.getPanes();
    //     panes.overlayMouseTarget.appendChild(this.div_);
    
    //     var that = this;
    //     google.maps.event.addDomListener(this.div_, 'click', function() {
    //         that.triggerClusterClick();
    //     });
    // };
    
    
    // /**
    //  * Returns the position to place the div dending on the latlng.
    //  *
    //  * @param {google.maps.LatLng} latlng The position in latlng.
    //  * @return {google.maps.Point} The position in pixels.
    //  * @private
    //  */
    // ClusterIcon.prototype.getPosFromLatLng_ = function(latlng) {
    //     var pos = this.getProjection().fromLatLngToDivPixel(latlng);
    //     pos.x -= parseInt(this.width_ / 2, 10);
    //     pos.y -= parseInt(this.height_ / 2, 10);
    //     return pos;
    // };
    
    
    // /**
    //  * Draw the icon.
    //  * @ignore
    //  */
    // ClusterIcon.prototype.draw = function() {
    //     if (this.visible_) {
    //         var pos = this.getPosFromLatLng_(this.center_);
    //         this.div_.style.top = pos.y + 'px';
    //         this.div_.style.left = pos.x + 'px';
    //     }
    // };
    
    
    // /**
    //  * Hide the icon.
    //  */
    // ClusterIcon.prototype.hide = function() {
    //     if (this.div_) {
    //         this.div_.style.display = 'none';
    //     }
    //     this.visible_ = false;
    // };
    
    
    // /**
    //  * Position and show the icon.
    //  */
    // ClusterIcon.prototype.show = function() {
    //     if (this.div_) {
    //         var pos = this.getPosFromLatLng_(this.center_);
    //         this.div_.style.cssText = this.createCss(pos);
    //         this.div_.style.display = '';
    //     }
    //     this.visible_ = true;
    // };
    
    
    // /**
    //  * Remove the icon from the map
    //  */
    // ClusterIcon.prototype.remove = function() {
    //     this.setMap(null);
    // };
    
    
    // /**
    //  * Implementation of the onRemove interface.
    //  * @ignore
    //  */
    // ClusterIcon.prototype.onRemove = function() {
    //     if (this.div_ && this.div_.parentNode) {
    //         this.hide();
    //         this.div_.parentNode.removeChild(this.div_);
    //         this.div_ = null;
    //     }
    // };
    
    
    // /**
    //  * Set the sums of the icon.
    //  *
    //  * @param {Object} sums The sums containing:
    //  *   'text': (string) The text to display in the icon.
    //  *   'index': (number) The style index of the icon.
    //  */
    // ClusterIcon.prototype.setSums = function(sums) {
    //     this.sums_ = sums;
    //     this.text_ = sums.text;
    //     this.index_ = sums.index;
    //     if (this.div_) {
    //         this.div_.innerHTML = sums.text;
    //     }
    
    //     this.useStyle();
    // };
    
    
    // /**
    //  * Sets the icon to the the styles.
    //  */
    // ClusterIcon.prototype.useStyle = function() {
    //     var index = Math.max(0, this.sums_.index - 1);
    //     index = Math.min(this.styles_.length - 1, index);
    //     var style = this.styles_[index];
    //     this.url_ = style['url'];
    //     this.height_ = style['height'];
    //     this.width_ = style['width'];
    //     this.textColor_ = style['textColor'];
    //     this.anchor_ = style['anchor'];
    //     this.textSize_ = style['textSize'];
    //     this.backgroundPosition_ = style['backgroundPosition'];
    // };
    
    
    // /**
    //  * Sets the center of the icon.
    //  *
    //  * @param {google.maps.LatLng} center The latlng to set as the center.
    //  */
    // ClusterIcon.prototype.setCenter = function(center) {
    //     this.center_ = center;
    // };
    
    
    // /**
    //  * Create the css text based on the position of the icon.
    //  *
    //  * @param {google.maps.Point} pos The position.
    //  * @return {string} The css style text.
    //  */
    // ClusterIcon.prototype.createCss = function(pos) {
    //     var style = [];
    //     style.push('background-size:contain;background-repeat:no-repeat;background-image:url(' + this.url_ + ');');
    //     var backgroundPosition = this.backgroundPosition_ ? this.backgroundPosition_ : '0 0';
    //     style.push('background-position:' + backgroundPosition + ';');
    
    //     if (typeof this.anchor_ === 'object') {
    //         if (typeof this.anchor_[0] === 'number' && this.anchor_[0] > 0 &&
    //             this.anchor_[0] < this.height_) {
    //             style.push('height:' + (this.height_ - this.anchor_[0]) +
    //                 'px; padding-top:' + this.anchor_[0] + 'px;');
    //         } else {
    //             style.push('height:' + this.height_ + 'px; line-height:' + this.height_ +
    //                 'px;');
    //         }
    //         if (typeof this.anchor_[1] === 'number' && this.anchor_[1] > 0 &&
    //             this.anchor_[1] < this.width_) {
    //             style.push('width:' + (this.width_ - this.anchor_[1]) +
    //                 'px; padding-left:' + this.anchor_[1] + 'px;');
    //         } else {
    //             style.push('width:' + this.width_ + 'px; text-align:center;');
    //         }
    //     } else {
    //         style.push('height:' + this.height_ + 'px; line-height:' +
    //             this.height_ + 'px; width:' + this.width_ + 'px; text-align:center;');
    //     }
    
    //     var txtColor = this.textColor_ ? this.textColor_ : 'black';
    //     var txtSize = this.textSize_ ? this.textSize_ : 11;
    
    //     style.push('cursor:pointer; top:' + pos.y + 'px; left:' +
    //         pos.x + 'px; color:' + txtColor + '; position:absolute; font-size:' +
    //         txtSize + 'px; font-family:Arial,sans-serif; font-weight:bold');
    //     return style.join('');
    // };
    
    
    // // Export Symbols for Closure
    // // If you are not going to compile with closure then you can remove the
    // // code below.
    // window['MarkerClusterer'] = MarkerClusterer;
    // MarkerClusterer.prototype['addMarker'] = MarkerClusterer.prototype.addMarker;
    // MarkerClusterer.prototype['addMarkers'] = MarkerClusterer.prototype.addMarkers;
    // MarkerClusterer.prototype['clearMarkers'] =
    //     MarkerClusterer.prototype.clearMarkers;
    // MarkerClusterer.prototype['fitMapToMarkers'] =
    //     MarkerClusterer.prototype.fitMapToMarkers;
    // MarkerClusterer.prototype['getCalculator'] =
    //     MarkerClusterer.prototype.getCalculator;
    // MarkerClusterer.prototype['getGridSize'] =
    //     MarkerClusterer.prototype.getGridSize;
    // MarkerClusterer.prototype['getExtendedBounds'] =
    //     MarkerClusterer.prototype.getExtendedBounds;
    // MarkerClusterer.prototype['getMap'] = MarkerClusterer.prototype.getMap;
    // MarkerClusterer.prototype['getMarkers'] = MarkerClusterer.prototype.getMarkers;
    // MarkerClusterer.prototype['getMaxZoom'] = MarkerClusterer.prototype.getMaxZoom;
    // MarkerClusterer.prototype['getStyles'] = MarkerClusterer.prototype.getStyles;
    // MarkerClusterer.prototype['getTotalClusters'] =
    //     MarkerClusterer.prototype.getTotalClusters;
    // MarkerClusterer.prototype['getTotalMarkers'] =
    //     MarkerClusterer.prototype.getTotalMarkers;
    // MarkerClusterer.prototype['redraw'] = MarkerClusterer.prototype.redraw;
    // MarkerClusterer.prototype['removeMarker'] =
    //     MarkerClusterer.prototype.removeMarker;
    // MarkerClusterer.prototype['removeMarkers'] =
    //     MarkerClusterer.prototype.removeMarkers;
    // MarkerClusterer.prototype['resetViewport'] =
    //     MarkerClusterer.prototype.resetViewport;
    // MarkerClusterer.prototype['repaint'] =
    //     MarkerClusterer.prototype.repaint;
    // MarkerClusterer.prototype['setCalculator'] =
    //     MarkerClusterer.prototype.setCalculator;
    // MarkerClusterer.prototype['setGridSize'] =
    //     MarkerClusterer.prototype.setGridSize;
    // MarkerClusterer.prototype['setMaxZoom'] =
    //     MarkerClusterer.prototype.setMaxZoom;
    // MarkerClusterer.prototype['onAdd'] = MarkerClusterer.prototype.onAdd;
    // MarkerClusterer.prototype['draw'] = MarkerClusterer.prototype.draw;
    
    // Cluster.prototype['getCenter'] = Cluster.prototype.getCenter;
    // Cluster.prototype['getSize'] = Cluster.prototype.getSize;
    // Cluster.prototype['getMarkers'] = Cluster.prototype.getMarkers;
    
    // ClusterIcon.prototype['onAdd'] = ClusterIcon.prototype.onAdd;
    // ClusterIcon.prototype['draw'] = ClusterIcon.prototype.draw;
    // ClusterIcon.prototype['onRemove'] = ClusterIcon.prototype.onRemove;
    
    
    
    
    // var locations = [
    //   {name:'taipei101',price:'350',lat:25.0339031,lng:121.5623212},
    //   {name:'airport',price:'150',lat:25.063236,lng:121.5503405},
    //   {name:'train station',price:'160',lat:25.0455016,lng:121.5186618},
    //   {name:'MRT station',price:'100',lat:25.0625538,lng:121.5171593}, 
    //   {name:'aaa station',price:'100',lat:25.062236,lng:121.554405}, 
    //   {name:'bbb station',price:'300',lat:25.0685538,lng:121.5151593}, 
    //   {name:'ccc station',price:'400',lat:25.066236,lng:121.555405}, 
    //   {name:'ddd station',price:'500',lat:25.056236,lng:121.555405}, 
    //   {name:'eee station',price:'500',lat:25.056236,lng:121.535405}, 
    //   {name:'fff station',price:'600',lat:25.054236,lng:121.545405}, 
    //   {name:'ggg station',price:'700',lat:25.055236,lng:121.546405}, 
    //   {name:'ggg station',price:'700',lat:25.054236,lng:121.546705}, 
    // ];
    
    // var imgArr =   [{
    //     url: '',
    //     height: 80,
    //     width: 120,
    //     anchor: [32, 0],
    //     textColor: '#fff',
    //     textSize: 10,
    //     backgroundPosition:'center',
    // }];
    // function createGroup(map,arr){
    //   var markerCluster = new MarkerClusterer(map, arr, {
    //     gridSize: 50, 
    //     maxZoom: 15,
    //     zoomOnClick: true,
    //     styles: imgArr,
    //     imagePath: 'https://googlemaps.github.io/js-marker-clusterer/images/m'
    //   });
    //   // 上方 library 直接拉近 event失效
    //   // google.maps.event.addListener(markerCluster, 'clusterclick', function(cluster) {
    //   // 	var markers = cluster.getMarkers();
    //   // var string = '';
    //   // 	for(var i = 0; i < markers.length; i++) {
    //   // 		string += markers[i].data.replace('<br/>','') +'\n';
    //   // 	}
    //   // alert(string);
    //   // });
    // }

   const filterFunctions={
    handlelistingStatus,
    handlepropertyTypes,
    handlepriceRange,
    handlebedrooms,
    handlebathroms,
    handlelocation,
    handlesquirefeet,
    handleyearBuild,
        handlecategories,
    priceRange,
    listingStatus,
    propertyTypes,
    resetFilter,
   
    bedrooms,
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
    setPropertyTypes,
    setSearchQuery
  }


    useEffect(() => {
        var listings=[];
        const refItems = listings.filter((elm) => {
            if (listingStatus == "All") {
              return true;
            } else if (listingStatus == "Buy") {
              return !elm.forRent;
            } else if (listingStatus == "Rent") {
              return elm.forRent;
            }
          });
      
          let filteredArrays = [];


      
          if (propertyTypes.length > 0) {
            const filtered = refItems.filter((elm) =>
            propertyTypes.includes(elm.propertyType)
            );
            filteredArrays = [...filteredArrays, filtered];
          }
          filteredArrays = [...filteredArrays,refItems.filter((el=>el.bed >=bedrooms)) ];
          filteredArrays = [...filteredArrays,refItems.filter((el=>el.bath >=bathroms)) ];
          filteredArrays = [...filteredArrays,refItems.filter((el=>el.city.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||  el.location.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||  el.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())  ||  el.features.join(' ').toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))) ];
         
    
          filteredArrays = [...filteredArrays,!categories.length ? [...refItems] : refItems.filter((elm)=>categories.every(elem=>elm.features.includes(elem))) ];
  
          if (location != 'All Cities') {
           
            
            filteredArrays = [...filteredArrays,refItems.filter((el=>el.city == location)) ];
          }
         
         
          if (priceRange.length > 0) {
            const filtered = refItems.filter(
              (elm) =>
                Number(elm.price.split('$')[1].split(',').join('')) >= priceRange[0] &&
                Number(elm.price.split('$')[1].split(',').join('')) <= priceRange[1],
            );
            filteredArrays = [...filteredArrays, filtered];
          }
          if (squirefeet.length > 0 && squirefeet[1]) {
            const filtered = refItems.filter(
              (elm) =>
              elm.sqft >= squirefeet[0] &&
             elm.sqft <= squirefeet[1],
            );
            filteredArrays = [...filteredArrays, filtered];
          }
          if (yearBuild.length > 0) {
            const filtered = refItems.filter(
              (elm) =>
                elm.yearBuilding >= yearBuild[0] &&
                 elm.yearBuilding <= yearBuild[1]
            );
            filteredArrays = [...filteredArrays, filtered];
          }
          

 
         
      
          const commonItems = refItems.filter((item) =>
            filteredArrays.every((array) => array.includes(item))
          );

         
          setFilteredData(commonItems);
         
          
      
    }, [
        listingStatus,
        propertyTypes,
        priceRange,
        bedrooms,
        bathroms,
        location,
        squirefeet,
        yearBuild,
        categories,
        searchQuery

    ])

    useEffect(() => {
      setPageNumber(1)
      if (currentSortingOption == 'Newest') {
        const sorted = [...filteredData].sort((a,b)=>a.yearBuilding - b.yearBuilding)
        setSortedFilteredData(sorted)
       
        
      } 
      else if (currentSortingOption.trim() == 'Price Low') {
        const sorted = [...filteredData].sort((a,b)=>a.price.split('$')[1].split(',').join('') - b.price.split('$')[1].split(',').join(''))
        setSortedFilteredData(sorted);
      } 
      else if (currentSortingOption.trim() == 'Price High') {
        const sorted = [...filteredData].sort((a,b)=>b.price.split('$')[1].split(',').join('') - a.price.split('$')[1].split(',').join(''))
        setSortedFilteredData(sorted);
      } 
      else {
        setSortedFilteredData(filteredData) 
      }
    }, [filteredData,currentSortingOption,])
    const [posts, setPosts] = useState([]);
    useEffect(() => {
      setPageNumber(1);
      document.getElementById('autocomplete').value=queryParams.get("location");
      document.getElementById('locality').value=queryParams.get("locality");
      document.getElementById('postal_code').value=queryParams.get("postal_code");
      document.getElementById('sublocality_level_1').value=queryParams.get("sublocation");
      document.getElementById('sublocality_level_2').value=queryParams.get("sublocation2");
      document.getElementById('sublocality_level_3').value=queryParams.get("sublocation3");
      document.getElementById('route').value=queryParams.get("route");
      document.getElementById('administrative_area_level_1').value=queryParams.get("state");
      document.getElementById('country').value=queryParams.get("country");
      document.getElementById('placeid').value=queryParams.get("placeid");
      if(queryParams.get("realview")>0){
        document.getElementById("realProp").checked=true;
        if(isMobile){
        document.getElementById("realProp2").checked=true;
        }
      }
      var re = new RegExp("userid" + "=([^;]+)"); 
      var userId = re.exec(document.cookie);
      var uId=(userId)?userId[1]:'';
      let postObj={
        requestType:'search-results',
        query_Params:{
          location:queryParams.get("location"),
          locality:queryParams.get("locality"),
          postal_code:queryParams.get("postal_code"),
          min_price:queryParams.get("min_price"),
          max_price:queryParams.get("max_price"),
          sublocation:queryParams.get("sublocation"),
          sublocation2:queryParams.get("sublocation2"),
          sublocation3:queryParams.get("sublocation3"),
          route:queryParams.get("route"),
          state:queryParams.get("state"),
          country:queryParams.get("country"),
          property_type:queryParams.get("property_type"),
          transaction_type:queryParams.get("transaction_type"),
          beds:queryParams.get("beds"),
          listedby:queryParams.get("listedby"),
          construction_status:queryParams.get("construction_status"),
          min_area:queryParams.get("min_area"),
          max_area:queryParams.get("max_area"),
          amenities:queryParams.get("amenities"),
          realview:queryParams.get("realview"),
          status:queryParams.get("status"),
          placeid:queryParams.get("placeid"),
          userid:uId,
        }
      }
      axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers: { 'Content-Type': 'application/json' }})
      .then(response => {
        if(response.data.length>0){
          setPosts(response.data);
          loadMap(response.data);
          document.getElementById("mapresults").style.display='block';
          document.getElementById("noresults").style.display="none";
          if(isMobile){
          document.getElementById("listIcon").style.display="block";
          //document.querySelector(".mobilelistview2").style.display="flex";
          }
        }else{
          setPosts([]);
          document.getElementById("mapresults").style.display='none';
          document.getElementById("noresults").style.display="block";
          if(isMobile){
          document.getElementById("listIcon").style.display="none";
          //document.querySelector(".mobilelistview2").style.display="none";
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
      
    
    },[queryParams.get("location"),queryParams.get("min_price"),queryParams.get("max_price"),queryParams.get("property_type"),queryParams.get("beds"),queryParams.get("transaction_type"),queryParams.get("beds"),queryParams.get("listedby"),queryParams.get("construction_status"),queryParams.get("amenities"),queryParams.get("min_area"),queryParams.get("max_area"),queryParams.get("realview"),queryParams.get("status"),queryParams.get("placeid")]);
    useEffect(() => {
      //if(!document.querySelector(".pac-container")){
      document.querySelector(".pac-container")?.remove();
      var ac = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), {address:'hyderabad', types: ['geocode'],componentRestrictions: {country:"in"}});ac.addListener('place_changed', function(){document.getElementById("locality").value=""; document.getElementById("sublocality_level_1").value=""; document.getElementById("sublocality_level_2").value=""; document.getElementById("sublocality_level_3").value="";document.getElementById("route").value="";document.getElementById("locality").value=""; document.getElementById("locality").value="";document.getElementById("postal_code").value=""; document.getElementById("administrative_area_level_1").value=""; document.getElementById("country").value=""; var place = ac.getPlace();  if (!place.geometry) { return; } document.getElementById("placeid").value=place.place_id; var componentForm = { street_number: 'short_name', sublocality_level_1: 'short_name', sublocality_level_2: 'short_name', sublocality_level_3: 'short_name', route: 'long_name', locality: 'long_name', administrative_area_level_1: 'short_name', postal_code: 'short_name', country:'short_name'};for (var i = 0; i < place.address_components.length; i++) {var addressType = place.address_components[i].types[0];if (componentForm[addressType]) { var val = place.address_components[i][componentForm[addressType]]; document.getElementById(addressType).value = val;}} setTimeout(()=>{ document.getElementById("sortBy").value=""; search()},500); });
      //}  
      });
      var pagenum=(pageNumber * 8) > posts.length ? posts.length :(pageNumber * 8);
      var pagestart =((pageNumber - 1) * 8);
      useEffect(() => {
        setPagedata(posts.slice(pagestart,pagenum));
        setPageContentTrac([(pagestart+1),pagenum,posts.length]);
      },[posts,pageNumber]);
      const handleChildData = (id) => { 
           setOpenwindow(false);
           document.getElementById("loginPopup").value=0;
           google.maps.event.trigger(markers[id+pagestart], 'click');  
           Map.setZoom(16);
       };
       const mobilehandleChildData = (latitude,longitude) => {
          let newid=document.querySelector(".swiper-slide-active").getAttribute("id");
          setOpenwindow(false);
          document.getElementById("loginPopup").value=0;
          google.maps.event.trigger(markers[newid], 'click'); 
          Map.setZoom(16);
       };

      function search(){
        let location=document.getElementById("autocomplete").value;
        let locality=document.getElementById("locality").value;
        if(location==""){
          document.getElementById("autocomplete").value="";
          document.getElementById("searchflash").style.display='block';
          document.querySelector("#searchflash p").style.padding="16px";
          document.getElementById("flashcontent").textContent="Enter Address, City or State";
          setTimeout(()=>{document.getElementById("searchflash").style.display='none';},1500);
          return;
        }else{
          if(location.includes('Saroornagar')){
            document.getElementById("sublocality_level_1").value="Saroornagar";
          }
          let sublocality_level_1=document.getElementById("sublocality_level_1").value; 
          if((sublocality_level_1=="" && locality=="Hyderabad") || (sublocality_level_1=="" && locality=="Secunderabad") || document.getElementById('autocomplete').value=="Telangana, India" || document.getElementById('autocomplete').value=="India"){  document.querySelector("#searchflash p").style.paddingTop="0";  
          document.querySelector("#searchflash p").style.padding="10px";
          document.getElementById("flashcontent").textContent="Enter Localities in your city eg: Madhapur, LB Nagar, etc"; 
          document.getElementById("searchflash").style.display='block';
          document.getElementById("autocomplete").value=""; 
          setTimeout(()=>{document.getElementById("searchflash").style.display='none';},1500);
          return false;
        }
      }
        
        let postal_code=document.getElementById("postal_code").value;
        let min_price=document.getElementById("minprce").value;
        let max_price=document.getElementById("maxprce").value;
        let sublocation=document.getElementById("sublocality_level_1").value;
        let sublocation2=document.getElementById("sublocality_level_2").value;
        let sublocation3=document.getElementById("sublocality_level_3").value;
        let route=document.getElementById("route").value;
        let state=document.getElementById("administrative_area_level_1").value;
        let country=document.getElementById("country").value;
        let status_type=1;
        let realViewprop=document.getElementById("realViewprop").value;
        let placeid=document.getElementById("placeid").value;
        navigate(`/map-view?location=${location}&locality=${locality}&postal_code=${postal_code}&min_price=${min_price}&max_price=${max_price}&sublocation=${sublocation}&sublocation2=${sublocation2}&sublocation3=${sublocation3}&route=${route}&state=${state}&country=${country}&status=${status_type}&realview=${realViewprop}&placeid=${placeid}`);
      }
      function clearinput(){
        document.getElementById("autocomplete").value="";
        document.getElementById("locality").value=""; document.getElementById("sublocality_level_1").value=""; document.getElementById("sublocality_level_2").value=""; document.getElementById("sublocality_level_3").value="";document.getElementById("route").value="";document.getElementById("locality").value=""; document.getElementById("locality").value="";document.getElementById("postal_code").value=""; document.getElementById("administrative_area_level_1").value=""; document.getElementById("country").value="";
      }
      function loadMap(listdata){
        //var locations=[];
        // listdata.forEach(function(listing){ console.log(listing);
        //   locations.push({lat:parseFloat(listing.latitude),lng:parseFloat(listing.longitude),price:listing.price});
        // });
          var map = new google.maps.Map(document.getElementById('map'), {
          center: { lat:parseFloat(listdata[0].latitude), lng:parseFloat(listdata[0].longitude)}, 
          zoom: 14,
          mapId:"475f881958a6435e",
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
          },
        });
        // let postObj={
        //   requestType:'polygon',
        //   placeid:document.getElementById("placeid").value
        // }
        // axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers: { 'Content-Type': 'application/json' }})
        // .then(response => {
        //   console.log("response",response);
        //   var Data=response.data;
        //   if(Data.data.length>0 && Data.statusCode==200){
        //     map.setCenter({lat:Data.otherParams.center.lat, lng:Data.otherParams.center.lon});
        //     var triangleCoords = Data.data.map(coord => ({lat:coord.lat, lng:coord.lon}));;
        //     var bermudaTriangle = new google.maps.Polygon({
        //       paths: triangleCoords,
        //       strokeColor: '#FF0000',
        //       strokeOpacity: 0.8,
        //       strokeWeight: 2,
        //       fillColor: '#FF0000',
        //       fillOpacity: 0.35
        //     });
        //     bermudaTriangle.setMap(map);
        //   }
        // })
        // .catch(error => {
        //   console.error(error);
        // });
        setMap(map);
        var myinfo=null;var markr=[];var prvmr=0;
        listdata.forEach(function(location) {
          var dtour="";
          if(location.D_url!=""){
            dtour="<br/><div class='dtour realview2'>RealView360&deg;</div>";
          }
          var labelContent=dtour+"<div class='inner'>"+location.price+"</div><div class='arrow'></div><div class='arrow'></div>";
          if(location.units>1){
            labelContent="<div class='inner'>"+unitsIcon+location.units+" Units</div><div class='arrow'></div><div class='arrow'></div>";
          }
          var marker = new MarkerWithLabel({
            draggable: false,
            raiseOnDrag: false,
            position: new google.maps.LatLng(parseFloat(location.latitude), parseFloat(location.longitude)),
            //position:{lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)},
            icon:" ",
            labelContent:labelContent,
            map: map,
            //label:"$d",
            labelAnchor: new google.maps.Point(35, 25),
            labelClass: "labels",
            labelStyle: {opacity: 1.75},
            //url:"https://nearestate.in/3d_tour?id="+location.id+"#apartment-360-views",
            url:"https://www.nearestate.in/realview/"+location.encryptid,
            durl:location.D_url,
            units:location.units,
            data:'',
            dataPrice:location.price
          });
          // var marker = new MarkerWithLabel({
          //   draggable: false,
          //   raiseOnDrag: false,
          //   icon: ' ',
          //   map: map,
          //   labelContent: "<br/><div class='dtour realview2'>RealView360&deg;</div><div class='inner'>"+location.price+" Lcs</div><div class='arrow'></div><div class='arrow'></div>",
          //   labelAnchor: new google.maps.Point(40,32),
          //   labelClass: "labels", // the CSS class for the label
          //   labelStyle: {opacity: 1},
          //   position: {lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)},
          //   data:'Go to '+location.name + '<br/> Taxi price: NT' +location.price,
          //   dataPrice: location.price
          //   });
          
          markr.push(marker);
          var infoContent="";
          var iw;
          if(location.units>1){
            var myunits=location.units;
            infoContent='<div id="infobox">';
            location.moreUnits.forEach((location,index)=>{
                   let border=""; 
                   if(index>0 && index<myunits){
                    border='<div style="width:100%;float:left;background:#000;height:1px;"></div>';
                   }
                   if(!location.D_url){ 
                   infoContent+=border+'<div class="card-item" style="width:100%;float:left;margin:5px 0px 5px 0px;"><a href='+location.link+' target="_blank"><img style="height:70px;width:80px; float:left;width:30%;" src='+location.photo+' /></a><div style="float:left;width:70%;"><h4><a style="cursor:pointer" id="'+location.encryptid+'" class="realviewinfo">'+location.property_title+'</a><div style="margin-left:10px !important;" class="list-meta d-flex align-items-center price-meta"><a><span class="flaticon-bed"></span> '+location.beds+'</a>&nbsp;&nbsp;&nbsp;&nbsp;<a><span class="flaticon-shower"></span> '+location.bathrooms+'</a>&nbsp;&nbsp;&nbsp;&nbsp;<a><span class="flaticon-expand"></span> '+location.area+'</a></div></h4></div></div>';
                   }else{
                    infoContent+=border+'<div class="card-item" style="width:100%;float:left;margin:5px 0px 5px 0px;"><a style="cursor:pointer" id="'+location.encryptid+'" class="realviewinfo"><img id="'+location.encryptid+'" class="realviewinfo" style="height:70px;width:80px; float:left;width:30%;" src='+location.photo+' /></a><div style="float:left;width:70%;"><h4><a style="cursor:pointer" id="'+location.encryptid+'" class="realviewinfo">'+location.property_title+'</a><div style="margin-left:10px !important;" class="list-meta d-flex align-items-center price-meta"><a><span class="flaticon-bed"></span> '+location.beds+'</a>&nbsp;&nbsp;&nbsp;&nbsp;<a><span class="flaticon-shower"></span> '+location.bathrooms+'</a>&nbsp;&nbsp;&nbsp;&nbsp;<a><span class="flaticon-expand"></span> '+location.area+'</a></div></h4></div></div>';
                   }
            });
            infoContent+='</div>';
            iw = new google.maps.InfoWindow({
              content:infoContent
            });
          }
          else if(!location.D_url){
           infoContent ='<div id="infobox"><a href=' +location.link+' target="_blank"><img style="height:200px;width:100%;" src='+location.photo+' /><div class="list-price map_price" style="background-color: #ffffff;border-radius: 6px;bottom: 65px;color: var(--headings-color);font-family: var(--title-font-family);font-weight: 600;font-size: 15px;left: 20px;padding: 3px 12px;position: absolute;">'+location.price+'</div><h4>' +location.property_title+ '<div class="list-meta d-flex align-items-center price-meta"><a><span class="flaticon-bed"></span> '+location.beds+'</a>&nbsp;&nbsp;&nbsp;&nbsp;<a><span class="flaticon-shower"></span> '+location.bathrooms+'</a>&nbsp;&nbsp;&nbsp;&nbsp;<a><span class="flaticon-expand"></span> '+location.area+'</a></div></h4></a></div>';
          }else{
            infoContent ='<div id="infobox"><a style="cursor:pointer" id="'+location.encryptid+'" class="realviewinfo"><img style="height:200px;width:100%;" src='+location.photo+' id="'+location.encryptid+'" class="realviewinfo" /><div class="list-price realviewinfo map_price" id="'+location.encryptid+'" style="background-color: #ffffff;border-radius: 6px;bottom: 65px;color: var(--headings-color);font-family: var(--title-font-family);font-weight: 600;font-size: 15px;left: 20px;padding: 3px 12px;position: absolute;">'+location.price+'</div><h4>' +location.property_title+ '<div class="list-meta d-flex align-items-center price-meta"><a><span class="flaticon-bed"></span> '+location.beds+'</a>&nbsp;&nbsp;&nbsp;&nbsp;<a><span class="flaticon-shower"></span> '+location.bathrooms+'</a>&nbsp;&nbsp;&nbsp;&nbsp;<a><span class="flaticon-expand"></span> '+location.area+'</a></div></h4></a></div>';
          }
          iw = new google.maps.InfoWindow({
            content:infoContent
          });
           google.maps.event.addListener(marker, "mouseover", function (e) {
            var _index=markr.indexOf(marker);
            setOpenwindow(false);
            document.getElementById("loginPopup").value=0;
            if(document.querySelectorAll(".swiper-pagination-bullet")[_index]){
              document.querySelectorAll(".swiper-pagination-bullet")[_index].click();
            }
            //map.panTo(marker.getPosition());
            //let loginPopup=document.getElementById("loginPopup").value;
            // if(marker && loginPopup==1 && marker.durl!=""){
            //   let _login=document.getElementById("logcol").innerText;
            //   if(_login.includes("Login")){
            //     document.querySelectorAll(".showrealview").forEach(function(element){
            //       element.style.display="block"
            //     });
            //     document.querySelectorAll(".hideRealview").forEach(function(element){
            //       element.style.display="none" 
            //     });
            //     document.getElementById("realviewPopupflag").value=1;
            //     document.getElementById("tourUrl").value=marker.url;
            //     document.getElementById("loginBtn").click();return false;
            //   }else{
            //     var re = new RegExp("userid" + "=([^;]+)"); 
            //     var userId = re.exec(document.cookie);
            //     if(userId){
            //       openInNewTab(marker.url);
            //     }
            //   }
            // }
            if(prvmr!=location.id){
            prvmr=location.id;
            setOpenwindow(true);
            if(myinfo){ 
            myinfo.close(); 
            }  
            myinfo=iw;
              iw.open(map, this);
            }
            //document.getElementById("loginPopup").value=1;
           });
           google.maps.event.addListener(marker, "click", function (e) {
            var _index=markr.indexOf(marker);
            if(document.querySelectorAll(".swiper-pagination-bullet")[_index]){
              document.querySelectorAll(".swiper-pagination-bullet")[_index].click();
            }
            map.panTo(marker.getPosition());
            let loginPopup=document.getElementById("loginPopup").value;
            if(marker && loginPopup==1 && marker.durl!=""){
              let _login=document.getElementById("logcol").innerText;
              if(_login.includes("Login")){
                if(marker.units==1){
                document.querySelectorAll(".showrealview").forEach(function(element){
                  element.style.display="block"
                });
                document.querySelectorAll(".hideRealview").forEach(function(element){
                  element.style.display="none" 
                });
                document.getElementById("realviewPopupflag").value=1;
                document.getElementById("tourUrl").value=marker.url;
                document.getElementById("loginBtn").click();return false;
              }
              }else{
                var re = new RegExp("userid" + "=([^;]+)"); 
                var userId = re.exec(document.cookie);
                if(userId){
                  if(marker.units==1){
                  openInNewTab(marker.url);
                  }
                }
              }
            }
            if(prvmr!=location.id || document.querySelector(".gm-style-iw-c")===null){
            prvmr=location.id;
            setOpenwindow(true);
            if(myinfo){ 
            myinfo.close(); 
            }  
            myinfo=iw;
              iw.open(map, this);
            }
            document.getElementById("loginPopup").value=1;
           });
          // var marker = new google.maps.Marker({
          //   position: { lat: location.lat, lng: location.lng},
          //   map: map,
          //   icon: {
          //     labelOrigin: new google.maps.Point(11, 50),
          //     url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png'
          //   },
          //   label: {
          //     text: location.price,
          //     className: 'price-marker'
          //   },
          //   title: 'Price: ' + location.price
          // });
        });
        setMarkers(markr);
        if(isMobile){
          document.getElementById("container").classList.add("bottomcls");
        }
        //createGroup(map,markr)
      }
      function openInNewTab(href) {
        Object.assign(document.createElement('a'), {
          target: '_blank',
          rel: 'noopener noreferrer',
          href: href,
        }).click();
      }
      function sortby(){
        let sortby=document.getElementById("sortBy").value;
        if(sortby==0){
          let posts2=posts.sort((a,b)=>{ return parseInt(b.id)-parseInt(a.id) });
        }
        if(sortby==1){
          let posts2=posts.sort((a,b)=>{ return parseInt(a.price_raw)-parseInt(b.price_raw) });
          setPosts(posts2);
        }
        if(sortby==2){
          let posts2=posts.sort((a,b)=>{ return parseInt(b.price_raw)-parseInt(a.price_raw) });
          setPosts(posts2);
        }
        loadMap(posts);
        setPageNumber(1);
        pagenum=(pageNumber * 8) > posts.length ? posts.length :(pageNumber * 8);
        pagestart =((pageNumber - 1) * 8);
        setPagedata(posts.slice(pagestart,pagenum));
       }
      function listview(){
        navigate(`/list-view?${window.location.href.split("?")[1]}`);
      }
      function realviewProperties(){
        let realviewproperties=document.getElementById("realProp2");
        if(realviewproperties.checked){ 
          //setRealViewprop([1]);
          document.getElementById("realViewprop").value=1;
        }else{
          document.getElementById("realViewprop").value=0;
          //setRealViewprop([0]);
        }
        search();
      }
      function realviewOpen(id,encryptid){
        let _login=document.getElementById("logcol").innerText;
          //var _url="https://nearestate.in/3d_tour?id="+id+"#apartment-360-views";
          var _url="https://www.nearestate.in/realview/"+encryptid;
          if(_login.includes("Login")){
            document.querySelectorAll(".showrealview").forEach(function(element){
              element.style.display="block"
            });
            document.querySelectorAll(".hideRealview").forEach(function(element){
              element.style.display="none" 
            });
            document.getElementById("realviewPopupflag").value=1;
            document.getElementById("tourUrl").value=_url;
            document.getElementById("loginBtn").click();
            document.getElementById("_isRealview").value=1;return false;
          }else{
            var re = new RegExp("userid" + "=([^;]+)"); 
            var userId = re.exec(document.cookie);
            if(userId){
              openInNewTab(_url);
            }
          }
      }
      setTimeout(()=>{
      document.querySelectorAll(".realviewinfo").forEach(function(element){
         element.addEventListener("click",function(e){ e.preventDefault();e.stopImmediatePropagation();e.stopPropagation();
            if(element.getAttribute("id")!=""){
              realviewOpen(100,element.getAttribute("id"));
            }
         });
      });},100);
      document.body.addEventListener("click",function(event){
         if(event.target.classList.contains("realviewinfo")){
          realviewOpen(100,event.target.id);
         }
      });
      function realviewOpen(id,encryptid){
          let _login=document.getElementById("logcol").innerText;
          //var _url="https://nearestate.in/3d_tour?id="+id+"#apartment-360-views";
          var _url="https://www.nearestate.in/realview/"+encryptid;
          if(_login.includes("Login")){
            document.querySelectorAll(".showrealview").forEach(function(element){
              element.style.display="block"
            });
            document.querySelectorAll(".hideRealview").forEach(function(element){
              element.style.display="none" 
            });
            document.getElementById("realviewPopupflag").value=1;
            document.getElementById("tourUrl").value=_url;
            document.getElementById("loginBtn").click();
            document.getElementById("_isRealview").value=1;
            return false;
          }else{
            var re = new RegExp("userid" + "=([^;]+)"); 
            var userId = re.exec(document.cookie);
            if(userId){
              openInNewTab(_url);
            }
          }
      }
      function openInNewTab(href) {
        Object.assign(document.createElement('a'), {
          target: '_blank',
          rel: 'noopener noreferrer',
          href: href,
        }).click();
      }
      function chkLogin(){
        let _login=document.getElementById("logcol").innerText;
        if(_login.includes("Login")){
          document.getElementById("loginBtn").click();
          document.getElementById("autocomplete").value="";
          document.getElementById("autocomplete").blur();
          return false;
        }
      }
      // document.querySelectorAll(".login-info").forEach(function(element){
      //     element.addEventListener("click",function(e){ 
      //       //e.preventDefault();e.stopImmediatePropagation();e.stopPropagation();
      //       document.getElementById("searchbar").classList.add("hider");
      //     });
      // });
      document.body.addEventListener("click",function(e){
       // e.preventDefault();e.stopImmediatePropagation();e.stopPropagation();
       if(e.target.classList.contains('fa-user-circle')){
          document.querySelectorAll(".searchbar").forEach(function(element){
            element.classList.add("hider");
          });
          if(document.querySelector("#dropMenu3")){
            if(!document.querySelector("#dropMenu3").matches(".show")){
              document.querySelectorAll(".searchbar").forEach(function(element){
                element.classList.remove("hider");
              });
            }
          }
       }else{
        document.querySelectorAll(".searchbar").forEach(function(element){
          element.classList.remove("hider");
        });
       }
      });
  return (
    <>
     {/* <!-- Advance Feature Modal Start --> */}
     <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModal"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
        >
          <AdvanceFilterModal filterFunctions={filterFunctions} />
        </div>
      </div>
      {/* <!-- Advance Feature Modal End --> */}

      {/* Property Filtering */}
      <div id="searchflash"><p><i className="far fa-warning fz16 me-1"></i>&nbsp;<span id="flashcontent">Please Enter Location</span></p></div>  
      <div className="col-lg-5">
        <div className="advance-search-list d-flex justify-content-between searchbar" id="searchbar" style={{paddingLeft: '24px',paddingTop:'8px',paddingRight: '0px'}}>
          <div className="dropdown-lists">
            <ul className="p-0 mb-0">
            <li className="list-inline-item position-relative" style={{width:"68%"}}>
            <span className="icon flaticon-home-1" style={{position:'absolute',top:'8px',left:'5px'}}></span>  
            <input
                className="form-control bgc-f7 bdrs12 custom-txtbox"
                type="text"
                id="autocomplete"
                name="search"
                autoComplete="off"
                onFocus={()=>chkLogin()}
                onKeyUp={()=>chkLogin()}
                onKeyDown={()=>chkLogin()}
                //onFocus={()=>'return false'}
                style={{height:"40px",border:"solid 1px #dddddd",paddingLeft:"24px",paddingRight:'30px'}}
                // onInput={() => initialize()}
                placeholder={`Enter Localities in your city eg: Madhapur, LB Nagar, etc`}
              />
              <span className="flaticon-close align-text-top pr10" onClick={()=> clearinput()} style={{position: 'absolute',float: 'right',right: '0px',top: '8px',cursor:'pointer',fontSize:'13px'}}></span>
                {/* <input type="text" className="form-control custom-txtbox" style={{height:"40px",border:"solid 1px #dddddd"}}/> */}
            </li>
            <li className="list-inline-item">
              {/* Advance Features modal trigger */}
              <button
                type="button"
                className="open-btn mb15"
                data-bs-toggle="modal"
                data-bs-target="#advanceSeachModal"
              >
                <i className="flaticon-settings me-2" /> Filter
              </button>
            </li>
              {/* <TopFilterBar2 filterFunctions ={filterFunctions } /> */}
            </ul>
          </div>
        </div>
      </div>
      <section className="p-0 bgc-f7">
        
        {/* End .container */}
      </section>
      <form name="searchFrm" action="https://www.nearestate.in/map_view" method="get"><input type="hidden" name="location" id="location" /><input type="hidden" name="type" id="type" /><input type="hidden" name="min-price" id="minprce" /><input type="hidden" name="max-price" id="maxprce" /><input type="hidden" id="street_number" name="street_name" /> <input type="hidden" id="sublocality_level_1" name="sublocation" /> <input type="hidden" id="sublocality_level_2" name="sublocation2" /> <input type="hidden" id="sublocality_level_3" name="sublocation3" /> <input type="hidden" id="route" name="route"/> <input type="hidden" id="locality" name="locality"/> <input type="hidden" id="postal_code" name="postal_code"/> <input type="hidden" id="administrative_area_level_1" name="state"/> <input type="hidden" id="country" name="country"/><input type="hidden" id="prop_type" value={1} /><input type="hidden" id="loginPopup"  value={1}/><input type="hidden" id="realviewPopupflag"  value={0}/><input type="hidden" id="_isRealview" value={0} /><input type='hidden' name='placeid' id='placeid'/></form>
      <div className="container-fluid">
          <div className="row" id="mapcolmn" data-aos="fade-up" data-aos-duration="200" style={{height:"100%",background:'#fff'}}>
            {!isMobile &&<div className="col-xl-5" style={{background:'rgb(247, 247, 247)'}}>
              <div className="half_map_area_content mt10">
              
                {/* End .col-12 */}
                {posts.length>0 && <h4 className="mb-1" id="list_title">{posts[0].city} properties for {posts[0].property_status}</h4>}
                {posts.length>0 &&  <div className="row align-items-center mb10">
                  {/* <TopFilterBar   pageContentTrac={[pagestart+1,pagenum,posts.length]}  colstyle ={colstyle} setColstyle={setColstyle}  setCurrentSortingOption ={setCurrentSortingOption } /> */}
                  <div className="col-sm-6">
                    <div className="text-center text-sm-start">
                      <p className="pagination_page_count mb-0">
                        Showing {pageContentTrac[0]}–{pageContentTrac[2] < pageContentTrac[1] ? pageContentTrac[2] : pageContentTrac[1]} of {pageContentTrac[2]} results
                      </p>
                    </div>
                  </div>
                  {/* End .col-sm-6 */}
                  <div className="col-sm-6">
                    <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
                      <div className="pcs_dropdown pr10 d-flex align-items-center">
                        <span style={{ minWidth: "60px" }}>Sort by </span>
                        <select className="form-select" id="sortBy" onChange={()=>{sortby()}} >
                        <option value={""}>Select</option>
                          <option value={1}>Price Low</option>
                          <option value={2}>Price High</option>
                        </select>
                      </div>
                      {/* <div className={`pl15 pr15 bdrl1 bdrr1 d-none d-md-block cursor  ${!colstyle? 'menuActive':'#' } `}   onClick={()=>setColstyle(false)}>
                        Grid
                      </div>
                      <div className={`pl15 d-none d-md-block cursor  ${colstyle? 'menuActive':'#' }`} onClick={()=>setColstyle(true)}>
                        List
                      </div> */}
                      <div className={`pl15 d-md-block cursor`} onClick={()=>listview()}>
                      <i className="far fa-list"></i> List View
                      </div>
                    </div>
                  </div>
                </div>}
                {posts.length>0 && <div className="row">
                  <FeaturedListings  colstyle ={colstyle} onChildData={handleChildData}  data ={pageData} />
                </div>}
                <div id="noresults" className="noresults alert alert-warning" style={{display:'none'}}>No Results Found For Your Search Criteria <input id='sortBy' type='hidden' /></div>
                {/* End .row */}

                {posts.length>0 && <div className="row text-center">
                <PaginationTwo pageCapacity={8} data={posts} pageNumber={pageNumber} setPageNumber={setPageNumber}/>
                </div>}
                {/* End .row */}
              </div>
              {/* End .half_map_area_content */}
            </div>} 
            <div className="col-xl-7" style={{padding:'0px',margin:'0px'}}>
            {!isMobile && <div id="listIcon" style={{margin:'-11px 2px -5px 0px',left: '1%',background: '#fff',display: 'flex',alignItems: 'center',marginBottom: '-4px',width:'144px',borderRadius:'22px',boxShadow:'7px 8px 8px -2px #716a9333',top:'-7%',position:'relative',height:'44px'}} className={`pl15 d-md-block cursor mobilelistview mobilelistview2`}>
              <label className="switch switch3">
              <input type="checkbox" id="realProp2" onChange={()=>realviewProperties()} style={{float:'right',margin:'8px 5px'}}/>
                <span className="slider slider2 round" style={{width:'54px'}}></span>
              </label>
              <span className="realview2" style={{color: '#000',fontSize: '10px',fontWeight:'bold',marginRight:'-8px'}}>&nbsp;RealView360°</span>
            </div>}         
            <div id="mapresults" className="overflow-hidden position-relative" style={{marginTop:'-99px',height:'88vh'}}>
              <div className="half_map_area map-canvas half_style">
               <div id="map"></div> 
              {/* <ListingMap1/> */}
              </div>
            </div>          
            </div>          
            {isMobile && <div id="listIcon" className={`pl15 d-md-block cursor mobilelistview`} onClick={()=>listview()}>
              <i className="far fa-list"></i> List View
              <input type='hidden' id='sortBy' />
            </div>}  
            {isMobile && <div id="listIcon" style={{margin:'-11px 2px -5px 0px',left: '2%',background: '#fff',display: 'flex',alignItems: 'center',marginBottom: '-4px',width:'142px',borderRadius:'22px',boxShadow:'7px 8px 8px -2px #716a9333'}} className={`pl15 d-md-block cursor mobilelistview mobilelistview2`}>
              <label className="switch switch2">
              <input type="checkbox" id="realProp2" onChange={()=>realviewProperties()} style={{float:'right',margin:'8px 5px'}}/>
                <span className="slider slider2 round" style={{width:'54px'}}></span>
              </label>
              <span className="realview2" style={{color: '#000',fontSize: '10px',fontWeight:'bold',marginRight:'-8px'}}>&nbsp;RealView360°</span>
            </div>}        
            {isMobile && <div id="container" style={{position: 'fixed',bottom:'300px',zIndex:'99999999'}}>
            <div className="container">
          {/* End .row */}
          <div className="row">
          <div className="col-auto mb30" style={{display:'none'}}>
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="featured_prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>
                {/* End prev */}

                <div className="col-auto">
                  <div className="pagination swiper--pagination featured_pagination__active" />
                </div>
                {/* End pagination */}

                <div className="col-auto">
                  <button className="featured_next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
                {/* End Next */}
              </div>
            </div>
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-listing-slider">
              <Swiper
                className="overflow-visible"
                spaceBetween={30}
                modules={[Navigation, Pagination]}
                navigation={{
                  nextEl: ".featured_next__active customnext",
                  prevEl: ".featured_prev__active customprev",
                }}
                pagination={{
                  el: ".featured_pagination__active",
                  clickable: true,
                }}
                slidesPerView={1}
                breakpoints={{
                  300: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                  1200: {
                    slidesPerView: 3,
                  },
                }}
              >
                    
                {posts.slice(0, posts.length).map((listing,index) => (
                  <SwiperSlide key={listing.id} id={index}>
                    <div className="item" onTouchEnd={()=>mobilehandleChildData(listing.latitude,listing.longitude)}>
                    {listing.D_url&&<div className="listing-style1" style={{marginBottom:'10px',borderRadius:'0px'}}>
                      <a onClick={()=>{realviewOpen(listing.id,listing.encryptid)}} style={{color:'#000'}}>
                        <div className="list-thumb" style={{width:'35%',float:'left'}}>
                          <img
                            className="w-100 h-100 cover propertyimg2"
                            src={listing.photo}
                            alt="listings"
                          />
                          {/* <div className="list-price">
                            {listing.price}
                          </div> */}
                        </div>
                        <div className="list-content" style={{width:'65%',float:'left',padding:listing.property_title.length>28?'0px 8px':'11px 8px'}}>
                          <h6 className="list-title" style={{fontSize:'14px'}}>
                            {listing.property_title}
                          </h6>
                          {/* <p className="list-text">{listing.myDescription}</p> */}
                          <div className="list-meta align-items-center">
                            <a style={{display: 'block',width:'100%',fontSize:'14px',height:'22px'}}>
                            {listing.beds} BHK
                            </a>
                            <a style={{display: 'block',width:'100%',fontSize:'14px',height:'22px'}}>
                              {listing.area}
                            </a>
                            <a style={{fontWeight:'bold',display: 'block',width:'100%',fontSize:'14px',height:'22px'}}>{listing.price}</a>
                          </div>
                        </div>
                        <div className="ribbon ribbon-bottom-right"><span>RealView360&deg;</span></div>
                      </a>
                      </div>}
                      {!listing.D_url&&<div className="listing-style1" style={{marginBottom:'10px',borderRadius:'0px'}}>
                      <Link to={listing.link}  target="_blank">
                        <div className="list-thumb" style={{width:'35%',float:'left'}}>
                          <img
                            className="w-100 h-100 cover propertyimg2"
                            src={listing.photo}
                            alt="listings"
                          />
                          {/* <div className="list-price">
                            {listing.price}
                          </div> */}
                        </div>
                        <div className="list-content" style={{width:'65%',float:'left',padding:listing.property_title.length>28?'0px 8px':'11px 8px'}}>
                          <h6 className="list-title" style={{fontSize:'14px'}}>
                            {listing.property_title}
                          </h6>
                          <div className="list-meta align-items-center">
                            <a style={{display: 'block',width:'100%',fontSize:'14px',height:'22px'}}>
                            {listing.beds} BHK
                            </a>
                            <a style={{display: 'block',width:'100%',fontSize:'14px',height:'22px'}}>
                              {listing.area}
                            </a>
                            <a style={{fontWeight:'bold',display: 'block',width:'100%',fontSize:'14px',height:'22px'}}>{listing.price}</a>
                          </div>
                        </div>
                        </Link>
                      </div>}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              </div>
            </div>
          </div>
        </div>
        </div>}
            {/* End col-5 */}
  
            {/* End col-7 */}
          </div>
          {/* End TopFilterBar */}
        </div>
        {isMobile && 
        //  <div id="noresults" className="noresults no-results" style={{display:'none'}}><img src="/images/resource/no-data.jpg" /></div>
        <div id="noresults" className="noresults alert alert-warning" style={{display:'none'}}>No Results Found For Your Search Criteria</div>
        }
        <input type="hidden" id="realViewprop" />
        <input type="hidden" id="submitBtn" />
        <input type="hidden" id="fav_id" />
        <input type="hidden" id="contactFlag" />
        <input type="hidden" id="contactFlag"/><input type="hidden" id="reviewFlag" value="0" /><input type="hidden" name="tourUrl" id="tourUrl" value="0" /><input type="hidden" name="isfulldetails" id="isfulldetails" value="0" /><input type="hidden" id="isreview" /><input type="hidden" className="realviewinfo" />
        <input type='hidden' id='contactDetailsflag' />
    </>
  )
}