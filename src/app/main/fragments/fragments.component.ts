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

  fragmentPage: IFragment;
  @Input() pageId: number;
  public errorMessage: string;

  constructor(private fragmentsService: FragmentService) { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.loadFragments();
  }

  loadFragments(): void {
    this.fragmentsService.getFragment(this.pageId).subscribe(
      data => {
        this.fragmentPage = data[0]; // TODO: ONLY ONE SHOULD BE RECEIVED
      },
      error => this.errorMessage = <any>error // casting naar any
    );
  }

}
