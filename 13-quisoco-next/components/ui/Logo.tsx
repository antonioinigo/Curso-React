import Image from "next/image"


function Logo() {
  return (
    <div className="flex justify-center mt-5">
        <div className="relative w-40 h-40">
            <Image
                fill
                alt="Logotipo de la empresa"
                src='/logo.svg'
            />
        </div>
    </div>
  )
}

export default Logo
