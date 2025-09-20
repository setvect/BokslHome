"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const yesNoOptions = [
  { label: "예", value: "yes" },
  { label: "아니오", value: "no" },
];

export default function BoardCreatePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">게시판 만들기</h1>
      </div>

      <form className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>게시판 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-[160px_1fr] md:items-center">
              <Label htmlFor="board-code" className="text-sm font-medium md:text-base">
                코드
              </Label>
              <Input
                id="board-code"
                placeholder="예: BDAAAA10"
                className="md:max-w-md"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-[160px_1fr] md:items-center">
              <Label htmlFor="board-name" className="text-sm font-medium md:text-base">
                이름
              </Label>
              <Input
                id="board-name"
                placeholder="게시판 이름을 입력하세요"
                className="md:max-w-md"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-[160px_1fr] md:items-center">
              <Label
                htmlFor="upload-limit"
                className="text-sm font-medium md:text-base"
              >
                업로드 용량제한
              </Label>
              <Input
                id="upload-limit"
                type="number"
                min={0}
                placeholder="숫자로 입력"
                className="md:max-w-xs"
              />
            </div>

            <fieldset className="space-y-4">
              <legend className="text-sm font-medium text-muted-foreground">
                사용 설정
              </legend>
              <div className="space-y-4">
                <div className="grid gap-3 md:grid-cols-[160px_1fr] md:items-center">
                  <Label className="text-sm font-medium md:text-base">댓글 사용</Label>
                  <RadioGroup
                    defaultValue="no"
                    className="flex flex-wrap gap-4"
                    aria-label="댓글 사용 여부"
                  >
                    {yesNoOptions.map((option) => {
                      const id = `allow-comments-${option.value}`;
                      return (
                        <div key={option.value} className="flex items-center gap-2">
                          <RadioGroupItem id={id} value={option.value} />
                          <Label htmlFor={id} className="cursor-pointer text-sm">
                            {option.label}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>

                <div className="grid gap-3 md:grid-cols-[160px_1fr] md:items-center">
                  <Label className="text-sm font-medium md:text-base">파일 업로드</Label>
                  <RadioGroup
                    defaultValue="yes"
                    className="flex flex-wrap gap-4"
                    aria-label="파일 업로드 사용 여부"
                  >
                    {yesNoOptions.map((option) => {
                      const id = `allow-upload-${option.value}`;
                      return (
                        <div key={option.value} className="flex items-center gap-2">
                          <RadioGroupItem id={id} value={option.value} />
                          <Label htmlFor={id} className="cursor-pointer text-sm">
                            {option.label}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>

                <div className="grid gap-3 md:grid-cols-[160px_1fr] md:items-center">
                  <Label className="text-sm font-medium md:text-base">암호화 글 등록</Label>
                  <RadioGroup
                    defaultValue="no"
                    className="flex flex-wrap gap-4"
                    aria-label="암호화 글 등록 사용 여부"
                  >
                    {yesNoOptions.map((option) => {
                      const id = `allow-encrypted-${option.value}`;
                      return (
                        <div key={option.value} className="flex items-center gap-2">
                          <RadioGroupItem id={id} value={option.value} />
                          <Label htmlFor={id} className="cursor-pointer text-sm">
                            {option.label}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>
              </div>
            </fieldset>
          </CardContent>
          <CardFooter>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/board-manage">취소</Link>
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                확인
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
