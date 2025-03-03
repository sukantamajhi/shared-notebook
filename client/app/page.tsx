import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
	return (
		<div className='flex min-h-screen flex-col bg-background'>
			<header className='sticky top-0 z-40 border-b bg-background shadow-md'>
				<div className='container flex items-center justify-between py-4 flex-col sm:flex-row'>
					<div className='flex items-center gap-2'>
						<Link
							href='/'
							className='text-xl font-bold sm:text-2xl'>
							SharedNotebook
						</Link>
					</div>
					<div className='flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0'>
						<Link href='/auth/login'>
							<Button variant='ghost'>Login</Button>
						</Link>
						<Link href='/auth/register'>
							<Button>Sign Up</Button>
						</Link>
					</div>
				</div>
			</header>

			<main className='flex-1'>
				<section className='space-y-6 pb-8 pt-6 sm:pb-12 sm:pt-10 lg:py-32'>
					<div className='container flex max-w-full flex-col items-center gap-4 text-center px-4'>
						<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>
							Collaborative note-taking made simple
						</h1>
						<p className='max-w-3xl leading-normal text-muted-foreground sm:text-xl sm:leading-8'>
							Create, share, and collaborate on notes in
							real-time. Perfect for teams, students, and anyone
							who wants to organize their thoughts.
						</p>
						<div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
							<Link href='/auth/register'>
								<Button size='lg'>Get Started</Button>
							</Link>
							<Link href='/auth/login'>
								<Button variant='outline' size='lg'>
									Sign In
								</Button>
							</Link>
						</div>
					</div>
				</section>
				<section className='container space-y-6 py-6 sm:py-8 md:py-12 lg:py-24 px-4'>
					<div className='mx-auto flex max-w-5xl flex-col items-center space-y-4 text-center'>
						<h2 className='text-3xl font-bold leading-tight sm:text-4xl md:text-5xl'>
							Features
						</h2>
						<p className='max-w-4xl leading-normal text-muted-foreground sm:text-lg sm:leading-7'>
							Everything you need to create and share your notes.
						</p>
					</div>
					{/* Features Grid */}
					<div className='mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
						{[
							{
								title: "Real-time Collaboration",
								description:
									"Work together with your team in real-time, seeing changes as they happen.",
							},
							{
								title: "Markdown Support",
								description:
									"Format your notes with Markdown for rich text formatting.",
							},
							{
								title: "Organize with Notebooks",
								description:
									"Keep your noRea organized in notebooks for different projects.",
							},
							{
								title: "Sharing Controls",
								description:
									"Control who can view or edit your notebooks with fine-grained permissions.",
							},
							{
								title: "Version History",
								description:
									"Track changes and revert to previous versions when needed.",
							},
							{
								title: "Cross-platform",
								description:
									"Access your notes from any device with a web browser.",
							},
						].map((feature, index) => (
							<div
								key={index}
								className='relative overflow-hidden rounded-lg border bg-background shadow-md p-6 hover:shadow-xl transition-shadow duration-300'>
								<div className='space-y-2'>
									<h3 className='font-bold text-lg'>
										{feature.title}
									</h3>
									<p className='text-sm text-muted-foreground'>
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>
			</main>

			<footer className='border-t py-6 md:py-0 bg-background'>
				<div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
					<p className='text-center text-sm leading-loose text-muted-foreground md:text-left'>
						&copy; {new Date().getFullYear()} SharedNotebook. All
						rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
