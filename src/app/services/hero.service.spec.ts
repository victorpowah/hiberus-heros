import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { Hero } from '../models/hero';
import { HeroService } from './hero.service';

describe('HeroService', () => {
    let service: HeroService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HeroService
            ]
        });

        service = TestBed.inject(HeroService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add hero', () => {
        service.addHero({ id: 40, name: 'thor' } as Hero).subscribe(heroes => { });
        const req = httpTestingController.expectOne("api/heroes");
        expect(req.request.method).toEqual('POST');
    });

    it('should edit hero', () => {
        service.updateHero({ id: 12, name: 'Bombasta' } as Hero).subscribe(heroes => { });
        const req = httpTestingController.expectOne("api/heroes");
        expect(req.request.method).toEqual('PUT');
    });

    it('should search hero', () => {
        service.searchHeroes("").subscribe(heroes => { });
        const req = httpTestingController.expectOne("api/heroes");
        expect(req.request.method).toEqual('GET');
    });

    afterEach(() => httpTestingController.verify());
});