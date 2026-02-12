import { Component, AfterViewInit, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-columnistas',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './columnistas.html',
    styleUrl: './columnistas.css',
})
export class ColumnistasComponent implements AfterViewInit, OnInit {
    columnistas: any[] = [];
    loading: boolean = true;

    constructor(private el: ElementRef, private api: ApiService, private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.loading = true;
        this.api.getAutores().subscribe({
            next: (data) => {
                this.columnistas = data;
                this.loading = false;
                this.cdr.detectChanges(); // Force view update
            },
            error: () => {
                this.loading = false;
                this.cdr.detectChanges(); // Force view update
            }
        });
    }

    ngAfterViewInit(): void {
    }
}
