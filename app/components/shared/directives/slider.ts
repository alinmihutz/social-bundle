import {Component, ElementRef, Inject, AfterViewInit, ChangeDetectorRef, Input, OnInit} from '@angular/core';

declare var jQuery: any;

@Component({
    selector: 'slider',
    template: `
        <input #sldValue [(ngModel)]="slideValue" id="{{inputName}}" type="{{type}}">
        <div id="slider">
            <span class="sb-slider-bubble-value">{{slideValue}} {{measureUnit}}</span>
        </div>
    `
})

export class Slider implements OnInit, AfterViewInit {
    @Input() orientation: string;
    @Input() min: number;
    @Input() max: number;
    @Input() step: number = 1;
    @Input() defaultValue: number;
    @Input() name: string;
    @Input() type: string;
    @Input() measureUnit: string;

    elementRef: ElementRef;
    slideValue: number;
    inputName: string;
    inputType: string;
    sliderMeasureUnit: string;
    options: any = {
        sliderBubbleClass: '.sb-slider-bubble-value',
        sliderHandleClass: '.ui-slider-handle',
        sliderId: '#slider'
    };

    constructor( @Inject(ElementRef) elementRef: ElementRef, public cdr: ChangeDetectorRef) {
        this.elementRef = elementRef;
    }

    ngOnInit() {
        this.inputName = this.name;
        this.inputType = this.type;
        this.slideValue = Number(this.defaultValue);
    }

    ngAfterViewInit() {
        let orientation = this.orientation;
        let min = this.min;
        let max = this.max;
        let step = this.step;
        let slider = jQuery(this.elementRef.nativeElement).find(this.options.sliderId);
        let sliderDisplay = jQuery(this.elementRef.nativeElement).find(this.options.sliderBubbleClass);

        slider.slider({
            step: step,
            range: false,
            orientation: orientation,
            min: min,
            max: max,
            value: this.slideValue,
            slide: (event: any, ui: any) => {
                setImmediate(function () {
                    sliderDisplay.css('left', jQuery(ui.handle)[0].style.left);
                });
                this.slideValue = ui.value;
            }
        });

        slider.on('click', function () {
            sliderDisplay.css(
                'left',
                slider.find('.ui-slider-handle')[0].style.left
            );
        });

        //slider bubble value position
        sliderDisplay.css('position', 'relative');
        //ui-slider-handle default position
        let percentDiff = this.defaultValue / max * 100;
        slider.find(this.options.sliderHandleClass).css('left', percentDiff + '%');
        slider.find(this.options.sliderBubbleClass).css('left', percentDiff + '%');
    }
}