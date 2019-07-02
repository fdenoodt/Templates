import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IFragment } from '../fragment';
import { FragmentService } from '../fragment.service';

@Component({
  selector: 'app-fragments',
  templateUrl: './fragments.component.html',
  styleUrls: ['./fragments.component.scss'],
  providers: [FragmentService]
})
export class FragmentsComponent implements OnInit, OnChanges {

  fragments: IFragment[];
  @Input() pageId: number;
  public errorMessage: string;

  constructor(private fragmentsService: FragmentService) { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.loadFragments();
  }

  loadFragments(): void {
    this.fragmentsService.getFragments(this.pageId).subscribe(
      data => {
        this.fragments = data; // TODO: ONLY ONE SHOULD BE RECEIVED
      },
      error => this.errorMessage = <any>error // casting naar any
    );
  }

}
