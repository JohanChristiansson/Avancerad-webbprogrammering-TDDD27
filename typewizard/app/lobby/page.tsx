import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function Page() {
    const aspectRatio = 16 / 9;
    const width = 450
    const height = width / aspectRatio

    return (
        <main className="p-24">
            <section>
                <ToggleGroup type="single">
                    <ToggleGroupItem size="lg" value="time">time</ToggleGroupItem>
                    <ToggleGroupItem size="lg" value="words">words</ToggleGroupItem>
                    <ToggleGroupItem size="lg" value="d">C</ToggleGroupItem>
                </ToggleGroup>
            </section>

            <section className="py-12 flex flex-col items-center text-center gap-8">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem>Väldigt svår text</CarouselItem>
                        <CarouselItem>Very hard english text </CarouselItem>
                        <CarouselItem>GOT fanfic</CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </section>
        </main>

        //         {
        //     <div>
        //     { }
        //     {[...Array(5)].map((_, index) => (
        //         <Avatar key={index}>
        //             <AvatarImage src={`https://github.com/shadcn.png`} />
        //             <AvatarFallback>{String.fromCharCode(65 + index)}</AvatarFallback>
        //         </Avatar>
        //     ))}
        // </div>
        // }
    );
};
