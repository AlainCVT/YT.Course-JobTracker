import type { ClassValue } from "clsx";
import clsx from "clsx";
import { Pen, Plus } from "lucide-react";

import Container from "@/components/Container";
import UpdateBoardDialog from "@/components/dialogs/board/UpdateBoardDialog";
import CreateColumnDialog from "@/components/dialogs/column/CreateColumnDialog";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/contexts/dashboard";
import { assertIsDefined } from "@/lib/assertion";

interface BoardHeadingProps {
  className?: ClassValue;
}

export default function BoardHeading({ className }: BoardHeadingProps) {
  const { board } = useDashboard();

  assertIsDefined(board);

  return (
    <div className={clsx(className)}>
      <Container className="flex justify-between gap-8">
        <div>
          <div>
            <h1 className="inline text-3xl font-bold">{board.name}</h1>
            <UpdateBoardDialog
              payload={board}
              trigger={
                <Button className="mx-2" variant="link" size="icon-sm">
                  <Pen />
                </Button>
              }
            />
          </div>
          {board.description && <p className="text-muted-foreground">{board.description}</p>}
        </div>
        <CreateColumnDialog
          boardId={board._id}
          boardName={board.name}
          trigger={
            <Button variant="outline">
              <Plus /> Add column
            </Button>
          }
        />
      </Container>
    </div>
  );
}
