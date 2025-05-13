/* eslint-disable react-dom/no-dangerously-set-innerhtml */
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollAreaScrollbar } from '@radix-ui/react-scroll-area';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { ScrollArea } from '~/components/ui/scroll-area';
import { getEmail } from './action';

const formSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少需要6个字符'),
  proxy: z.string().optional(),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '13528963984@163.com',
      password: 'a1234567',
      proxy: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // TODO: 实现登录逻辑
      setContent('');
      setLoading(true);
      const res = await getEmail(values);
      if (res) {
        setContent(res);
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden flex justify-center items-center">
      <div className="flex gap-4">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>登录</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>邮箱</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="请输入邮箱" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>密码</FormLabel>
                      <FormControl>
                        <Input disabled={loading} type="password" placeholder="请输入密码" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="proxy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>代理地址（可选）</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="请输入代理地址" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? '登录中...' : '登录'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {content && (
          <Card className="max-w-[720px] ">
            <CardHeader>
              <CardTitle>邮件内容</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
