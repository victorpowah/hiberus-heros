import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { Hero } from '../models/hero';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
    let service: LoadingService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                LoadingService
            ]
        });

        service = TestBed.inject(LoadingService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should throw an error', () => {
        try {
            service.setLoading(true, "");
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        }
        catch (e: any) {
            expect(e.message).toBe("The request URL must be provided to the LoadingService.setLoading function");
        }
    });

    it('should set loading true', () => {
        service.setLoading(true, "/api");

        service.loadingSub.subscribe(result => {
            expect(result).toBeTrue();
        })
    });

    it('should set loading false', () => {
        service.setLoading(false, "/api");

        service.loadingSub.subscribe(result => {
            expect(result).toBeFalse();
        })
    });

    afterEach(() => httpTestingController.verify());
});