import {Component, OnInit, ElementRef} from '@angular/core';

declare let $: any;

@Component({
    selector: 'jQuery-btn-component',
    template: `
        <button>Button</button>
    `
})

export class jQueryBtnComponent implements OnInit {
    constructor(private _elRef: ElementRef) { }
    ngOnInit(): any {
        $(this._elRef.nativeElement).find('button').on('click', function () {
            alert('jQueryBtnComponent');
        });
    }
}