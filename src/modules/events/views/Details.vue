<template>
  <div class="event">
    <div class="event__container">
      <a-sp-card
        ratio="wide"
        :minimized="messagesVisible"
        @click="messagesVisible = false"
      >
        <div
          class="events-list__icon"
          :class="{ 'mb-2': !messagesVisible, 'mr-2': messagesVisible }"
        >
          <i class="icon-basketball"></i>
        </div>
        <a-sp-title :size="messagesVisible ? 'small' : 'medium'">
          {{ event.name }}
        </a-sp-title>
        <template v-if="!messagesVisible">
          <div class="event__author mt-1">
            <a-sp-avatar
              class="mr-1"
              image-src="https://images.unsplash.com/photo-1547624643-3bf761b09502?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=50&h=50&q=80"
            />
            <a-sp-text class="pt-0">
              {{ event.author.username }}
            </a-sp-text>
          </div>

          <m-sp-list class="mt-3">
            <m-sp-list-el icon="eva eva-calendar-outline">
              <a-sp-text>
                {{ moment(event.date).format("MMMM Do YYYY") }}
              </a-sp-text>
              <a-sp-text size="small" color="light" class="mt-1">
                05:30 PM
              </a-sp-text>
            </m-sp-list-el>
            <m-sp-list-el icon="eva eva-people-outline" class="mt-2">
              <a-sp-text>
                15 ongoing people
              </a-sp-text>
              <m-sp-avatar-list
                class="mt-1"
                :items="[
                  {
                    imageSrc:
                      'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=50&h=50&q=80',
                  },
                  {
                    imageSrc:
                      'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=50&h=50&q=80',
                  },
                  {
                    imageSrc:
                      'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=50&h=50&q=80',
                  },
                ]"
              />
            </m-sp-list-el>
            <m-sp-list-el icon="eva eva-map-outline" class="mt-2 mb-1">
              <a-sp-text>
                Manchester City Stadium
              </a-sp-text>
              <a-sp-text size="small" color="light" class="mt-1">
                {{ event.location.locationName }}
              </a-sp-text>
            </m-sp-list-el>
          </m-sp-list>
        </template>
      </a-sp-card>
      <a-sp-card
        ratio="wide"
        :minimized="!messagesVisible"
        class="mt-1 mb-2"
        @click="messagesVisible = true"
      >
        <div
          class="events-list__icon"
          :class="{ 'mb-1': messagesVisible, 'mr-2': !messagesVisible }"
        >
          <i class="eva eva-message-square-outline"></i>
        </div>
        <a-sp-title :size="!messagesVisible ? 'small' : 'medium'">
          Messages
        </a-sp-title>
        <template v-if="messagesVisible">
          <div class="message">
            <a-sp-avatar
              image-src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=50&h=50&q=80"
              class="mr-1"
            />
            <div class="message__container">
              <div class="message__header">
                <a class="message__author mr-2" href="#">
                  John Kowalsky
                </a>
                <span class="message__date">
                  10 m. ago
                </span>
              </div>
              <p class="message__text mt-1">
                Hello amigo
              </p>
            </div>
          </div>
          <div class="message message--owner">
            <div class="message__container">
              <p class="message__text">
                Hello amigo
              </p>
            </div>
          </div>
          <div class="message">
            <a-sp-avatar
              image-src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=50&h=50&q=80"
              class="mr-1"
            />
            <div class="message__container">
              <div class="message__header">
                <a class="message__author mr-2" href="#">
                  John Kowalsky
                </a>
                <span class="message__date">
                  10 m. ago
                </span>
              </div>
              <p class="message__text mt-1">
                Hello amigo
              </p>
            </div>
          </div>
          <div class="message">
            <a-sp-avatar
              image-src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=50&h=50&q=80"
              class="mr-1"
            />
            <div class="message__container">
              <div class="message__header">
                <a class="message__author mr-2" href="#">
                  John Kowalsky
                </a>
                <span class="message__date">
                  10 m. ago
                </span>
              </div>
              <p class="message__text mt-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                luctus eget ipsum a pulvinar. Etiam pellentesque enim eu feugiat
                lacinia.
              </p>
            </div>
          </div>
        </template>
      </a-sp-card>
    </div>
    <div
      id="map"
      class="map"
      :class="{ 'map--first-plan': mapFirstPlan }"
      @click="changeIndex"
    ></div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
const namespace = "EventDetailsStore";
export default {
  name: "GoogleMap",
  data() {
    return {
      messagesVisible: false,
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      map: "",
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      mapFirstPlan: false,
      currentPlace: null,
    };
  },
  computed: {
    ...mapState(namespace, ["event"]),
  },
  methods: {
    ...mapActions(namespace, ["FETCH_EVENT"]),
    changeIndex: function() {
      // alert("asf")
      this.mapFirstPlan = !this.mapFirstPlan;
    },
    // receives a place object via the autocomplete component
  },
  mounted() {
    this.FETCH_EVENT(this.$route.params.id);
    const tt = window.tt;

    const map = tt.map({
      key: "T3rkU9oS8MBPuHOoOHTa85k4xgZYGl63",
      container: "map",
      style: "tomtom://vector/1/basic-main",
      zoom: 14,
    });
    // map.addControl(new tt.FullscreenControl());
    // map.addControl(new tt.NavigationControl());
    function createMarkerElement(type) {
      var element = document.createElement("div");
      var innerElement = document.createElement("div");
      element.className = "route-marker";
      innerElement.className = "icon tt-icon -white -" + type;
      element.appendChild(innerElement);
      return element;
    }
    function addMarkers(feature) {
      var startPoint, endPoint;
      if (feature.geometry.type === "MultiLineString") {
        startPoint = feature.geometry.coordinates[0][0]; //get first point from first line
        endPoint = feature.geometry.coordinates.slice(-1)[0].slice(-1)[0]; //get last point from last line
      } else {
        startPoint = feature.geometry.coordinates[0];
        endPoint = feature.geometry.coordinates.slice(-1)[0];
      }
      new tt.Marker({ element: createMarkerElement("start") })
        .setLngLat(startPoint)
        .addTo(map);
      new tt.Marker({ element: createMarkerElement("finish") })
        .setLngLat(endPoint)
        .addTo(map);
    }
    function findFirstBuildingLayerId() {
      var layers = map.getStyle().layers;
      for (var index in layers) {
        if (layers[index].type === "fill-extrusion") {
          return layers[index].id;
        }
      }
      throw new Error(
        "Map style does not contain any layer with fill-extrusion type."
      );
    }
    map.once("load", function() {
      tt.services
        .calculateRoute({
          key: "T3rkU9oS8MBPuHOoOHTa85k4xgZYGl63",
          traffic: false,
          locations: "20.9420387,50.960699:20.6399082,50.890115",
        })
        .go()
        .then(function(response) {
          var geojson = response.toGeoJson();
          map.addLayer(
            {
              id: "route",
              type: "line",
              source: {
                type: "geojson",
                data: geojson,
              },
              paint: {
                "line-color": "#4a90e2",
                "line-width": 8,
              },
            },
            findFirstBuildingLayerId()
          );
          addMarkers(geojson.features[0]);
          var bounds = new tt.LngLatBounds();
          geojson.features[0].geometry.coordinates.forEach(function(point) {
            bounds.extend(tt.LngLat.convert(point));
          });
          map.fitBounds(bounds, { duration: 0, padding: 50 });
        });
    });
  },
};
</script>
<style lang="scss" scoped>
.event {
  &__container {
    position: fixed;
    bottom: 0;
    z-index: 1;
  }
  &__author {
    display: flex;
  }
}
</style>
