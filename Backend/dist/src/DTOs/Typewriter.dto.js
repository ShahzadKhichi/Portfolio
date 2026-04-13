"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypewriterDTO = void 0;
class TypewriterDTO {
    static toResponse(typewriter) {
        return {
            _id: typewriter._id,
            text: typewriter.text,
        };
    }
    static toResponseList(typewriters) {
        return typewriters.map(typewriter => this.toResponse(typewriter));
    }
}
exports.TypewriterDTO = TypewriterDTO;
