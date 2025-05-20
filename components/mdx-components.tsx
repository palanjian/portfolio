import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import { Callout } from "./callout";

const useMDXComponent = (code: string) => {
    const fn = new Function(code)
    return fn({...runtime}).default
}

const components = {
    Image,
    Callout
    // Add MDX custom components here!
}

interface MdxProps {
    code: string
}

export function MDXContent({code}: MdxProps) {
    const Component = useMDXComponent(code)
    return (
        <Component components={components} />
    )
}