import clsx from 'clsx'

import ProfileNav from '@/components/NestedNav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={clsx(
        '3xl:py-[5rem] xl:w-[90%] xl:flex-row xl:px-0 md:flex-col md:w-full md:px-10 md:py-[5rem] sm:w-full sm:px-5 sm:py-[3rem] sm:flex-col gap-10 mx-auto flex '
      )}
    >
      <ProfileNav />
      {children}
    </section>
  )
}
