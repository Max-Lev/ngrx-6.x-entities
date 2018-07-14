export interface IFavoriteLocations {
    id: string;
    viewValue: string;
    isSelected: boolean;
};


export class FavoriteLocation implements IFavoriteLocations {
    id: string;
    viewValue: string;
    isSelected: boolean;
    constructor(data: any) {
        this.id = data.id;
        this.viewValue = data.location;
        this.isSelected = data.isSelected;
    }
}

export const locations: IFavoriteLocations[] = [
    { id: '1', viewValue: 'NY', isSelected: false },
    { id: '2', viewValue: 'London', isSelected: false },
    { id: '3', viewValue: 'Berlin', isSelected: false }
];