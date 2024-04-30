import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input() dataListType:string = "";
  @Input() movieOrTvSeries: string = "";
  @Input() query: string = "";
  title:string = ""

  items: number[] = [];
  currentIndex = 0;
  itemWidth = 300; // Adjust as needed
  offsetX = 10;

  loadingData: boolean = true;

  constructor(
    private _tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    this.setTitle();
    this.setItems();
  }

  /** When query search is changed, carousel item list is reset */
  ngOnChanges(changes: SimpleChanges): void {
    this.setItems();
  }

  /** Moves carousel to next index */
  next(): void {
    if (this.currentIndex < this.items.length - 1) {
      this.currentIndex++;
      this.offsetX = -this.currentIndex * this.itemWidth;
    }
  }

  /** Moves carousel to previous index */
  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.offsetX = -this.currentIndex * this.itemWidth;
    }
  }

  /** Checks if last item in list of items */
  isLastItem(): boolean {
    return this.currentIndex >= this.items.length - 10;
  }

  /** Reset item list first, then gets and sets list of items to be displayed */
  setItems(): void {
    this.items = []
    this.loadingData = true;
    switch(this.dataListType) {
      case "MoviesList_Popular": {
        this._tmdbService.getMoviesList_Popular().subscribe(data => {
          for(let index=0; index<data.results.length; index++) {
            this.items.push(data.results[index]['id']);
          }
          this.loadingData = false;
        });
        break;
      }
      case "MoviesList_NowPlaying": {
        this._tmdbService.getMoviesList_NowPlaying().subscribe(data => {
          for(let index=0; index<data.results.length; index++) {
            this.items.push(data.results[index]['id']);
          }
          this.loadingData = false;
        });
        break;
      }
      case "MoviesList_Upcoming": {
        this._tmdbService.getMoviesList_Upcoming().subscribe(data => {
          for(let index=0; index<data.results.length; index++) {
            this.items.push(data.results[index]['id']);
          }
          this.loadingData = false;
        });
        break;
      }
      case "MoviesList_TopRated": {
        this._tmdbService.getMoviesList_TopRated().subscribe(data => {
          for(let index=0; index<data.results.length; index++) {
            this.items.push(data.results[index]['id']);
          }
          this.loadingData = false;
        });
        break;
      }
      case "TVSeriesList_Popular": {
        this._tmdbService.getTVSeriesList_Popular().subscribe(data => {
          for(let index=0; index<data.results.length; index++) {
            this.items.push(data.results[index]['id']);
          }
          this.loadingData = false;
        });
        break;
      }
      case "TVSeriesList_AiringToday": {
        this._tmdbService.getTVSeriesList_AiringToday().subscribe(data => {
          for(let index=0; index<data.results.length; index++) {
            this.items.push(data.results[index]['id']);
          }
          this.loadingData = false;
        });
        break;
      }
      case "TVSeriesList_OnTV": {
        this._tmdbService.getTVSeriesList_OnTV().subscribe(data => {
          for(let index=0; index<data.results.length; index++) {
            this.items.push(data.results[index]['id']);
          }
          this.loadingData = false;
        });
        break;
      }
      case "TVSeriesList_TopRated": {
        this._tmdbService.getTVSeriesList_TopRated().subscribe(data => {
          for(let index=0; index<data.results.length; index++) {
            this.items.push(data.results[index]['id']);
          }
          this.loadingData = false;
        });
        break;
      }
      /** Search? */
      default: {
        switch(this.movieOrTvSeries) {
          case "MOVIES": {
            this._tmdbService.getMovieList_Search(this.query).subscribe(data => {
              for(let index=0; index<data.results.length; index++) {
                this.items.push(data.results[index]['id']);
              }
              this.loadingData = false;
            });
            break;
          }
          case "TVSERIES": {
            this._tmdbService.getTVSeriesList_Search(this.query).subscribe(data => {
              for(let index=0; index<data.results.length; index++) {
                this.items.push(data.results[index]['id']);
              }
              this.loadingData = false;
            });
            break;
          }
          default:
            console.log("movieOrTvSeries issue");
            break;
        }
        break;
      }
    }
  }

  /** Sets Title or Carousel */
  setTitle(): void {
    switch(this.dataListType) {
      case "MoviesList_Popular": {
        this.title = "Popular Movies";
        break;
      }
      case "MoviesList_NowPlaying": {
        this.title = "Now Playing";
        break;
      }
      case "MoviesList_Upcoming": {
        this.title = "Upcoming Movies";
        break;
      }
      case "MoviesList_TopRated": {
        this.title = "Top Rated Movies";
        break;
      }
      case "TVSeriesList_Popular": {
        this.title = "Popular TV Shows";
        break;
      }
      case "TVSeriesList_AiringToday": {
        this.title = "Airing Today";
        break;
      }
      case "TVSeriesList_OnTV": {
        this.title = "On TV";
        break;
      }
      case "TVSeriesList_TopRated": {
        this.title = "Top Rated TV Shows";
        break;
      }
      default: {
        this.title = "Search Results: ";
        break;
      }
    }
  }
}