import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../../services/tmdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(
    private _tmdbService: TmdbService
  ) {}

  ngOnInit(): void {

  }

}