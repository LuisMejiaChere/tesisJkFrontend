import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule, MatButtonToggle } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';

import {MatGridListModule} from '@angular/material/grid-list';



@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatGridListModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        MatListModule,
        MatCardModule,
        MatSidenavModule,
        MatMenuModule,
        MatTableModule,
        MatSelectModule,
        CdkTableModule,
        MatTabsModule,
        MatChipsModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatBadgeModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatSlideToggleModule,
        MatSortModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatExpansionModule
    ],
    exports: [
        MatSortModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatGridListModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatCardModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatMenuModule,
        MatTableModule,
        MatSelectModule,
        CdkTableModule,
        MatTabsModule,
        MatChipsModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatBadgeModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatExpansionModule
    ],
})
export class MaterialModule { }