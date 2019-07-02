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
        this.fragments = data;
      },
      error => this.errorMessage = <any>error // casting naar any
    );
  }

  newFragment() {
    const frag: IFragment = {
      id: 0,
      content: '',
      title: ''
    };
    this.fragmentsService.addFragment(frag, this.pageId).subscribe(
      data => {
        this.fragments.push(data);
      },
      error => this.errorMessage = <any>error // casting naar any
    );
  }

  deleteFragmentRequested(id: number): void {
    this.fragmentsService.removeFragment(id).subscribe(
      () => {
        const frag = this.fragments.filter(e => e.id === id)[0];
        this.fragments.splice(this.fragments.indexOf(frag), 1);
      },
      error => this.errorMessage = <any>error // casting naar any
    );
  }

}
