import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { ITypewriterService } from "../interfaces/ITypewriterService";
import { TypewriterDTO } from "../DTOs/Typewriter.dto";
import { getCache, setCache, deleteCache, DEFAULT_CACHE_TTL_SECONDS } from "../Utils/cache";

@injectable()
export class TypewriterController {
    constructor(
        @inject(TYPES.ITypewriterService) private typewriterService: ITypewriterService
    ) {}

    public getAllTypewriters = async (req: Request, res: Response): Promise<void> => {
        try {
            const cacheKey = "portfolio:typewriters";
            const cachedTypewriters = await getCache<any[]>(cacheKey);
            if (cachedTypewriters) {
                res.status(200).json({ success: true, typewriters: cachedTypewriters });
                return;
            }

            const typewriters = await this.typewriterService.getAllTypewriters();
            const responseList = TypewriterDTO.toResponseList(typewriters);

            await setCache(cacheKey, responseList);

            res.status(200).json({ success: true, typewriters: responseList });
        } catch (error) {
            console.error("Get Typewriters Error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    };

    public createTypewriter = async (req: Request, res: Response): Promise<void> => {
        try {
            const typewriter = await this.typewriterService.createTypewriter(req.body);
            const typewriterId = String((typewriter as any)._id ?? (typewriter as any).id ?? "");

            await deleteCache(["portfolio:typewriters", `portfolio:typewriter:${typewriterId}`]);
            const freshTypewriters = await this.typewriterService.getAllTypewriters();
            await setCache("portfolio:typewriters", TypewriterDTO.toResponseList(freshTypewriters), DEFAULT_CACHE_TTL_SECONDS);
            if (typewriterId) {
                await setCache(`portfolio:typewriter:${typewriterId}`, TypewriterDTO.toResponse(typewriter), DEFAULT_CACHE_TTL_SECONDS);
            }

            res.status(201).json({ success: true, typewriter: TypewriterDTO.toResponse(typewriter) });
        } catch (error) {
            console.error("Create Typewriter Error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    };

    public updateTypewriter = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            const updatedTypewriter = await this.typewriterService.updateTypewriter(id, req.body);
            if (!updatedTypewriter) {
                res.status(404).json({ success: false, message: "Typewriter text not found" });
                return;
            }

            await deleteCache(["portfolio:typewriters", `portfolio:typewriter:${id}`]);
            const freshTypewriters = await this.typewriterService.getAllTypewriters();
            await setCache("portfolio:typewriters", TypewriterDTO.toResponseList(freshTypewriters), DEFAULT_CACHE_TTL_SECONDS);
            await setCache(`portfolio:typewriter:${id}`, TypewriterDTO.toResponse(updatedTypewriter), DEFAULT_CACHE_TTL_SECONDS);

            res.status(200).json({ success: true, typewriter: TypewriterDTO.toResponse(updatedTypewriter) });
        } catch (error) {
            console.error("Update Typewriter Error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    };

    public deleteTypewriter = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            const deletedTypewriter = await this.typewriterService.deleteTypewriter(id);
            if (!deletedTypewriter) {
                res.status(404).json({ success: false, message: "Typewriter text not found" });
                return;
            }

            await deleteCache(["portfolio:typewriters", `portfolio:typewriter:${id}`]);
            const freshTypewriters = await this.typewriterService.getAllTypewriters();
            await setCache("portfolio:typewriters", TypewriterDTO.toResponseList(freshTypewriters), DEFAULT_CACHE_TTL_SECONDS);

            res.status(200).json({ success: true, message: "Typewriter text deleted successfully" });
        } catch (error) {
            console.error("Delete Typewriter Error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    };
}
