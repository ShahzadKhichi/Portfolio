import { ITypewriter } from "../Models/Typewriter.Model";

export interface TypewriterResponseDTO {
    _id: string;
    text: string;
}

export class TypewriterDTO {
    public static toResponse(typewriter: ITypewriter): TypewriterResponseDTO {
        return {
            _id: typewriter._id as string,
            text: typewriter.text,
        };
    }

    public static toResponseList(typewriters: ITypewriter[]): TypewriterResponseDTO[] {
        return typewriters.map(typewriter => this.toResponse(typewriter));
    }
}
