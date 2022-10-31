import {
    A,
    Z,
} from '@angular/cdk/keycodes';
import {
    Directive,
    ElementRef,
    forwardRef,
    HostListener,
    OnInit,
    Renderer2,
    Self,
} from '@angular/core';

@Directive({
    selector: '[appUppercase]',
})
export class UppercaseDirective {
    constructor(@Self() private _el: ElementRef, private _renderer: Renderer2) { }

    /** Trata as teclas */
    @HostListener('keyup', ['$event'])
    onKeyDown(evt: KeyboardEvent) {
        const keyCode = evt.keyCode;
        if (keyCode >= A && keyCode <= Z) {
            const value = this._el.nativeElement.value.toUpperCase();
            this._renderer.setProperty(this._el.nativeElement, 'value', value);
        }
    }
}
