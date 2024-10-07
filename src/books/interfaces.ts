export interface CreateBookDto {
	title: string;
	description: string;
	authors: string;
	favorite: string;
	fileCover: string;
	fileName: string;
	fileBook: string;
	comment: string[];
}

export interface UpdateBookDto {
	title?: string;
	description?: string;
	authors?: string;
	favorite?: string;
	fileCover?: string;
	fileName?: string;
	fileBook?: string;
	comment?: string[];
}
